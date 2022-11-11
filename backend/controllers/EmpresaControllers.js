import Empresa from '../models/Empresa.js';

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// helpers
import validaCnpj from '../helpers/verifica-cnpj.js';
import createUserToken from "../helpers/create-user-token.js";
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";
import transporter from '../helpers/send-email-config.js';

export default class EmpresaController {
    static async registro(req, res) {
        const { email, nomeEmpresa, nomeRepresentante, telefone, cnpj, senha, confirmeSenha } = req.body;

        // validations
        if (!nomeEmpresa) {
            res.status(422).json({ message: "O campo nome da empresa é obrigatório!" });
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
        if (!nomeRepresentante) {
            res.status(422).json({ message: "O campo seu nome é obrigatório!" });
            return;
        }

        if (!cnpj) {
            res.status(422).json({ message: "O campo CNPJ é obrigatório!" });
            return;
        }

        if (!validaCnpj(cnpj)) {
            res.status(422).json({ message: "O CNPJ não é valido!" });
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
        const emailExiste = await Empresa.findOne({ email: email });

        if (emailExiste) {
            res.status(422).json({ message: "Por favor, utilize outro e-mail!" });
            return;
        }

        const cnpjExiste = await Empresa.findOne({ cnpj: cnpj });

        if (cnpjExiste) {
            res.status(422).json({ message: "Por favor, utilize outro CNPJ!" });
            return;
        }

        //criptografa a senha 
        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(senha, salt);

        //create a empresa
        const empresa = new Empresa({
            nomeEmpresa,
            nomeRepresentante,
            email: email.toString().toLowerCase(),
            telefone,
            cnpj,
            role: 1,
            senha: senhaHash,
        });

        try {

            const newEmpresa = await empresa.save();
            await createUserToken(newEmpresa, req, res);
            

        } catch (error) {

            res.status(500).json({ message: error });

        }
    }

    static async getAll(req, res) {
        const empresas = await Empresa.find().sort('-createdAt').select('-senha');// (-) pegar ordem crescente

        res.status(200).json({ empresas: empresas });
    }
    
    static async checaEmpresa(req, res) {
        let empresaAtual;

        if (req.headers.authorization) {
            const token = getToken(req);
            const decoded = jwt.verify(token, 'qafsafvsdsfwe');

            empresaAtual = await Empresa.findById(decoded.id);

            empresaAtual.senha = undefined;

        } else {
            empresaAtual = null;
        }

        res.status(200).send(empresaAtual);
    }

    static async getEmpresaById(req, res) {
        const id = req.params.id

        // verificar se id exite e não quebra o programa mesmo que o id não seja hex ou tenha 24 caracteris

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(422).json({ "message": "Empresa não encontrada!" });
            return;
        }

        const empresa = await Empresa.findById(id).select('-senha'); // não exibe o campo senha

        res.status(200).json({ data: empresa });
    }

    static async editEmpresa(req, res) {
        const id = req.params.id;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(422).json({ "message": "Empresa não encontrada!" });
            return;
        }

        // 
        const token = getToken(req);
        const empresa = await getUserByToken(token);
       

        const { nomeEmpresa, nomeRepresentante, email, telefone, cnpj, senha, confirmeSenha } = req.body;
        console.log(req.body)
        // validações
        if (!nomeEmpresa) {
            res.status(422).json({ message: 'O nome da empresa é obrigatório!' });
            return;
        }
        empresa.nomeEmpresa = nomeEmpresa;

        if (!nomeRepresentante) {
            res.status(422).json({ message: 'O nome é obrigatório!' });
            return;
        }
        empresa.nomeRepresentante = nomeRepresentante;

        if (!email) {
            res.status(422).json({ message: 'O e-mail é obrigatório!' });
            return;
        }

        // checa se email já foi ultilizado.
        const emailExiste = await Empresa.findOne({ email: email });

        if (empresa.email !== email && emailExiste) {
            res.status(422).json({ message: "O e-mail já foi usado!" });
            return;
        }
        empresa.email = email;

        if (!telefone) {
            res.status(422).json({ message: "O campo telefone é obrigatório!" });
            return;
        }
        empresa.telefone = telefone;



        if (!cnpj) {
            res.status(422).json({ message: "O campo CNPJ é obrigatório!" });
            return;
        }

        if (!validaCnpj(cnpj)) {
            res.status(422).json({ message: "O CNPJ não é valido!" });
            return;
        }
        empresa.cnpj = cnpj;

        // checa se as senhas são iguais;
       if(senha == '' ){
        empresa.senha = empresa.senha
       }else{
        if (senha != confirmeSenha) {
            res.status(422).json({ error: 'As senhas não conferem!' });
            return;
            // Muda a senha
        } else if (senha == confirmeSenha && senha != null) {

            const salt = await bcrypt.genSalt(12);
            const reqSenha = req.body.senha;

            const senhaHash = await bcrypt.hash(reqSenha, salt);

            empresa.senha = senhaHash;
        }
       }
        try {
            //Retorna os dados atualizado.
            await Empresa.findOneAndUpdate(
                { _id: empresa._id },
                { $set: empresa },
                { new: true },
            );

            res.status(200).json({ message: 'Empresa atualizada com sucesso!' });

        } catch (error) {

            res.status(500).json({ message: error.message });
        }


    }

    static async sendMail(req,res){

       
        const { emailCandidato, candidato, titulo, mensagem } = req.body;

        if (!emailCandidato) {
            res.status(422).json({ message: "O campo de email é obrigatório!" });
            return;
        }
        if (!titulo) {
            res.status(422).json({ message: "O campo titulo é obrigatório!" });
            return;
        }
        if (!candidato) {
            res.status(422).json({ message: "O campo nome do candidato é obrigatório!" });
            return;
        }

        if (!mensagem) {
            res.status(422).json({ message: "O campo assunto é obrigatório!" });
            return;
        }
        

        try {
            //Retorna os dados atualizado.
            transporter.sendMail({
                text: mensagem,
                subject: titulo,
                from: 'SeekInternship <seekinternship@gmail.com>',
                to: emailCandidato,
            })

            res.status(200).json({ message: 'Email enviado com sucesso!' });

        } catch (error) {

            res.status(500).json({ message: error.message });
        }

    }



}