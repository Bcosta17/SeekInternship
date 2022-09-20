import Aluno from '../models/Aluno.js';

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// helpers
import validacpf from '../helpers/verifica-cpf.js';
import createUserToken from "../helpers/create-user-token.js";
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";

export default class AlunoController{
    static async registro(req, res){
       const { nome, email, telefone, cpf,interesses, senha, confirmeSenha } = req.body;

       // validations
       if(!nome) {
        res.status(422).json({ message: "O campo nome é obrigatório!"});
        return;
       }
       if(!email) {
        res.status(422).json({ message: "O campo e-mail é obrigatório!"});
        return;
       }
       if(!telefone) {
        res.status(422).json({ message: "O campo telefone é obrigatório!"});
        return;
       }
       if(!interesses) {
        res.status(422).json({ message: "O campo interesses é obrigatório!"});
        return;
       }
       
       if(!cpf) {
        res.status(422).json({ message: "O campo CPF é obrigatório!"});
        return;
       }
    
       if(!validacpf(cpf)){
        res.status(422).json({ message: "O CPF não é valido!"});
        return;
       }

       if(!senha) {
        res.status(422).json({ message: "O campo senha é obrigatório!"});
        return;
       }
       if(!confirmeSenha) {
        res.status(422).json({ message: "O campo confirmação de senha é obrigatório!"});
        return;
       }

       if( senha !== confirmeSenha){
        res.status(422).json({ message: "As senha e a confirmação de senha precisam ser iguais!"});
        return;
       }

       // checa se email já está cadastrado
       const emailExiste = await Aluno.findOne({ email: email});

       if(emailExiste){
        res.status(422).json({ message: "Por favor, utilize outro e-mail!"});
        return;
       }
       // checa se CPF já está cadastrado
       const cpfExiste = await Aluno.findOne({ cpf: cpf});

       if(cpfExiste){
        res.status(422).json({ message: "Por favor, utilize outro CPF!"});
        return;
       }

       //criptografa a senha 
       const salt = await bcrypt.genSalt(12);
       const senhaHash = await bcrypt.hash(senha, salt);
       
       //create a aluno
       const aluno = new Aluno({
        nome,
        email,
        telefone,
        interesses,
        cpf,
        senha: senhaHash,
       });

       try {
        
        const newAluno = await aluno.save();
        await createUserToken(newAluno, req, res);

       } catch (error) {

        res.status(500).json({ message : error});

       }
    }

    static async login(req, res) {
        const { email, senha } = req.body;

        if (!email) {
            res.status(422).json({ message: "O e-mail é obrigatório!"});
            return;
        }

        if (!senha) {
            res.status(422).json({ message: "A senha é obrigatória!"});
            return;
        }
        
        // checa se aluno já está cadastrado
        const aluno = await Aluno.findOne({ email: email});

        if(!aluno){
         res.status(422).json({ message: "Não há usuário cadastrado com este e-mail!"});
         return;
        }

       // checa se a senha está correta
       const checaSenha = await bcrypt.compare(senha, aluno.senha);

       if(!checaSenha){
         res.status(422).json({ message: "Senha invalida!" });
         return;
       }

       await createUserToken(aluno,req,res);
    }

    static async checaAluno(req, res) {        
        let alunoAtual;

        if(req.headers.authorization) {
            const token = getToken(req);
            const decoded = jwt.verify(token, 'qafsafvsdsfwe');

            alunoAtual = await Aluno.findById(decoded.id);

            alunoAtual.password = undefined;

        }else {
            alunoAtual = null;
        }

        res.status(200).send(alunoAtual);
    }

    static async getAlunoById(req, res){
        const id = req.params.id
        
        // verificar se id exite e não quebra o programa mesmo que o id não seja hex ou tenha 24 caracteris
        
        if (!id.match(/^[0-9a-fA-F]{24}$/)){
            res.status(422).json({"message":"Aluno não encontrado!"});
            return;
        }
        
        const aluno = await Aluno.findById(id).select('-senha'); // não exibe o campo senha
        
        res.status(200).json({aluno});
    }

    static async editAluno(req, res) {
        const id = req.params.id;
                
        if (!id.match(/^[0-9a-fA-F]{24}$/)){
            res.status(422).json({"message":"Aluno não encontrado!"})
            return
        }
        
        // checa se aluno existe
        const token = getToken(req);
        const aluno = await getUserByToken(token);
        
        console.log(aluno);
        
        const { nome, email, telefone, interesses, cpf, senha, confirmeSenha } = req.body;

        // validações
        if (!nome){
            res.status(422).json({ message: 'O nome é obrigatório!'});
            return;
        }
        aluno.nome = nome;

        if (!email){
            res.status(422).json({ message: 'O e-mail é obrigatório!'});
            return;
        }

        // checa se email já foi ultilizado.
        const emailExiste = await Aluno.findOne({email: email});

        if( aluno.email !== email && emailExiste){
            res.status(422).json({ message: "O e-mail já foi usado!"});
            return;
        }
        aluno.email = email;
        
        if(!telefone) {
            res.status(422).json({ message: "O campo telefone é obrigatório!"});
            return;
        }
        aluno.telefone = telefone;

        if(!interesses) {
            res.status(422).json({ message: "O campo interesses é obrigatório!"});
            return;
        }
        aluno.interesses = interesses;
           
        if(!cpf) {
            res.status(422).json({ message: "O campo CPF é obrigatório!"});
            return;
        }
        
        if(!validacpf(cpf)){
            res.status(422).json({ message: "O CPF não é valido!"});
            return;
        }
        aluno.cpf= cpf;
                   
        if (!senha) {
            res.status(422).json({ message: 'A senha é obrigatória!' });
            return;
        }
      
        if (!confirmeSenha) {
            res.status(422).json({ message: 'A confirmação de senha é obrigatória!' });
            return;
        }
            // checa se as senhas são iguais;
        if (senha!= confirmeSenha) {
            res.status(422).json({ error: 'As senhas não conferem!' });
            return;
            // Muda a senha
        } else if (senha == confirmeSenha && senha!= null) {
    
        const salt = await bcrypt.genSalt(12);
        const reqSenha = req.body.senha;
  
        const senhaHash = await bcrypt.hash(reqSenha, salt);
  
        aluno.senha = senhaHash;
        }
        
        try {
            //Retorna os dados atualizado do aluno.
           await Aluno.findOneAndUpdate(
                {_id: aluno._id},
                {$set: aluno},
                {new: true},
            );

            res.status(200).json({message: 'Aluno atualizado com sucesso!'});
           
        } catch (error) {
          
            res.status(500).json({message:error.message});
        }
        

    }

}