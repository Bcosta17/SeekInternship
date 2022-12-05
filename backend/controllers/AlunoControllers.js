import Aluno from '../models/Aluno.js';

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// helpers
import validacpf from '../helpers/verifica-cpf.js';
import createUserToken from "../helpers/create-user-token.js";
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";
import Empresa from '../models/Empresa.js';

export default class AlunoController {
    static async registro(req, res) {
        
        const { nome, email, telefone, cpf, curso, periodo,turno, senha, confirmeSenha } = req.body;

        console.log(req.body)
        // validations
        if (!nome) {
            res.status(422).json({ message: "O campo nome é obrigatório!" });
            return;
        }
        if (!email) {
            res.status(422).json({ message: "O campo e-mail é obrigatório!" });
            return;
        }
        if (!telefone) {
            res.status(422).json({ message: "O campo telefone é obrigatório!" });
            return;
        }
        if (!curso) {
            res.status(422).json({ message: "O campo curso é obrigatório!" });
            return;
        }

        if (!periodo) {
            res.status(422).json({ message: "O campo período é obrigatório!" });
            return;
        }

        if (!turno) {
            res.status(422).json({ message: "O campo turno é obrigatório!" });
            return;
        }
       
        

        if (!cpf) {
            res.status(422).json({ message: "O campo CPF é obrigatório!" });
            return;
        }

        if (!validacpf(cpf)) {
            res.status(422).json({ message: "O CPF não é valido!" });
            return;
        }

        if (!senha) {
            res.status(422).json({ message: "O campo senha é obrigatório!" });
            return;
        }
        if (!confirmeSenha) {
            res.status(422).json({ message: "O campo confirmação de senha é obrigatório!" });
            return;
        }

        if (senha !== confirmeSenha) {
            res.status(422).json({ message: "As senha e a confirmação de senha precisam ser iguais!" });
            return;
        }

        // checa se email já está cadastrado
        const emailExiste = await Aluno.findOne({ email: email }) || await Empresa.findOne({ email: email });

        if (emailExiste) {
            res.status(422).json({ message: "Por favor, utilize outro e-mail!" });
            return;
        }
        // checa se CPF já está cadastrado
        const cpfExiste = await Aluno.findOne({ cpf: cpf });

        if (cpfExiste) {
            res.status(422).json({ message: "Por favor, utilize outro CPF!" });
            return;
        }

        //criptografa a senha 
        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(senha, salt);

        //create a aluno
        const aluno = new Aluno({
            nome,
            email:email.toString().toLowerCase(),
            telefone,
            curso,
            cpf,
            periodo,
            turno,
            role: 0,
            senha: senhaHash,
        });

        try {

            const newAluno = await aluno.save();
            await createUserToken(newAluno, req, res);

        } catch (error) {

            res.status(500).json({ message: error });

        }
    }


    static async getAll(req, res) {
        const alunos = await Aluno.find().sort('-createdAt').select('-senha');
        const empresa = await Empresa.find().sort('-createdAt').select('-senha');
        const getall = alunos.concat(empresa)
        res.status(200).json({data: getall});
    }

    static async getAlunoById(req, res) {
        const id = req.params.id

        // verificar se id exite e não quebra o programa mesmo que o id não seja hex ou tenha 24 caracteris

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(422).json({ "message": "Aluno não encontrado!" });
            return;
        }

        const aluno = await Aluno.findById(id).select('-senha'); // não exibe o campo senha

        res.status(200).json({ data: aluno });
    }

    static async editAluno(req, res) {
        const id = req.params.id;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(422).json({ "message": "Aluno não encontrado!" })
            return
        }
        

        // checa se aluno existe
        const token = getToken(req);
        const aluno = await getUserByToken(token);

        const { nome, telefone, curso, periodo,turno, senha, confirmeSenha } = req.body;
        
        // validações
        if (!nome) {
            res.status(422).json({ message: 'O nome é obrigatório!' });
            return;
        }
        aluno.nome = nome;

        if (!telefone) {
            res.status(422).json({ message: "O campo telefone é obrigatório!" });
            return;
        }
        aluno.telefone = telefone;

        if (!curso) {
            res.status(422).json({ message: "O campo curso é obrigatório!" });
            return;
        }
        aluno.telefone = telefone;

        if (!periodo) {
            res.status(422).json({ message: "O campo período é obrigatório!" });
            return;
        }
        aluno.periodo = periodo;
        
        if (!turno) {
            res.status(422).json({ message: "O campo turno é obrigatório!" });
            return;
        }
        aluno.turno = turno;
        

     

        // checa se as senhas são iguais;
        if( senha == ''){
            aluno.senha = aluno.senha
        }else{
            if (senha != confirmeSenha) {
                res.status(422).json({ error: 'As senhas não conferem!' });
                return;
                // Muda a senha
            } else if (senha == confirmeSenha && senha != null) {
    
                const salt = await bcrypt.genSalt(12);
                const reqSenha = req.body.senha;
    
                const senhaHash = await bcrypt.hash(reqSenha, salt);
    
                aluno.senha = senhaHash;
            }
        }

        try {
            //Retorna os dados atualizado do aluno.
            await Aluno.findOneAndUpdate(
                { _id: aluno._id },
                { $set: aluno },
                { new: true },
            );

            res.status(200).json({ message: 'Aluno atualizado com sucesso!' });

        } catch (error) {

            res.status(500).json({ message: error.message });
        }

 
    }

    static async getVagasPorAluno(req, res) {

        // 
        const token = getToken(req);
        const aluno = await getUserByToken(token);

        if (aluno.role !== 0) {
            return res.status(401).json({ message: 'acesso negado!' });
        }
        const vagas = await Vaga.find({ 'aluno._id': aluno._id })
            .sort('-createdAt').select('-senha')
            .populate({ path: 'empresa', select: '-senha' });
        
        res.status(200).json({ data: vagas });

    }

    static async candidatarVaga(req, res) {
        const id = req.params.id;

        if (!ObjectId.isValidObjectId(id)) {
            res.status(422).json({ message: 'Id é invalido' });
            return;
        }

        const vaga = await Vaga.findOne({ _id: id });
        const alunos = vaga.alunos;

        if (!vaga) {
            res.status(404).json({ message: 'Vaga não encontrada' });
            return;
        }

        const token = getToken(req);
        const user = await getUserByToken(token);

        if (user.role !== 0) {
            return res.status(401).json({ message: 'acesso negado!' });
        }

        for (const aluno of alunos) {
            if (aluno._id.equals(user._id)) {
                res.status(422).json({ message: 'Você já se candidatou a está vaga' })
                return;
            }
        }
        alunos.push(user._id);
        await vaga.save();

        res.status(200).json({ message: 'Voce se candidatou com sucesso, agora aguarde o retorno da empresa!' });
        return;

    }

      // static async removerCandidatar(req, res) {
    //     const id = req.params.id;

    //     if (!ObjectId.isValidObjectId(id)) {
    //         res.status(422).json({ message: 'Id é invalido' });
    //         return;
    //     }

    //     const vaga = await Vaga.findOne({ _id: id });
    //     const alunos = vaga.alunos;

    //     if (!vaga) {
    //         res.status(404).json({ message: 'Vaga não encontrada' });
    //         return;
    //     }

    //     const token = getToken(req);
    //     const user = await getUserByToken(token);

    //     if (user.role !== 0) {
    //         return res.status(401).json({ message: 'acesso negado!' });
    //     }

    
    //     alunos.remove(user._id);
    //     await Vaga.findOneAndUpdate(
    //         { _id: vaga._id },
    //         { $set: vaga },
    //         { new: true },
    //     );
       
    //     res.status(200).json({ message: 'Vaga cancelada com sucesso!' });
    //     return;

    // }

}