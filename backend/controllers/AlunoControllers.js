import Aluno from '../models/Aluno.js';

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// helpers
import validacpf from '../helpers/verifica-cpf.js';
import createUserToken from "../helpers/create-user-token.js";
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";

export default class AlunoController {
    static async registro(req, res) {
        const { nome, email, telefone, cpf, curso, senha, confirmeSenha } = req.body;
        let curriculo= ''
        
        if(req.file){
           if(req.file.mimetype !== 'application/pdf'){
            res.status(422).json({ message: "Envie apenas arquivos pdf" });
            return;
           }else if(req.file.size > 5000000){
            res.status(422).json({ message: "O tamanho do arquivo tem q ser menor q 5mb" });
            return;
           }
           else{
            curriculo = req.file.filename
           }
        }

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
        const emailExiste = await Aluno.findOne({ email: email });

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
            curriculo,
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

        res.status(200).send({ alunos: alunos });
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

        const { nome, email, telefone, curriculo, cpf, senha, confirmeSenha } = req.body;
        console.log(req.body)
        // validações
        if (!nome) {
            res.status(422).json({ message: 'O nome é obrigatório!' });
            return;
        }
        aluno.nome = req.body().nome;

        if (!email) {
            res.status(422).json({ message: 'O e-mail é obrigatório!' });
            return;
        }

        // checa se email já foi ultilizado.
        const emailExiste = await Aluno.findOne({ email: email });

        if (aluno.email !== email && emailExiste) {
            res.status(422).json({ message: "O e-mail já foi usado!" });
            return;
        }
        aluno.email = email;

        if (!telefone) {
            res.status(422).json({ message: "O campo telefone é obrigatório!" });
            return;
        }
        aluno.telefone = telefone;

        if (!curriculo) {
            res.status(422).json({ message: "O campo curriculo é obrigatório!" });
            return;
        }
        aluno.curriculo = curriculo;

        if (!cpf) {
            res.status(422).json({ message: "O campo CPF é obrigatório!" });
            return;
        }
        aluno.cpf = cpf;

        if (!senha) {
            res.status(422).json({ message: 'A senha é obrigatória!' });
            return;
        }

        if (!confirmeSenha) {
            res.status(422).json({ message: 'A confirmação de senha é obrigatória!' });
            return;
        }
        // checa se as senhas são iguais;
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

}