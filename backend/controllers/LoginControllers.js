import Aluno from '../models/Aluno.js';
import Empresa from '../models/Empresa.js';

import bcrypt from "bcrypt";

import createUserToken from "../helpers/create-user-token.js";


export default class LoginController{
    static async login(req, res) {
        const { email, senha } = req.body;

        if (!email) {
            res.status(422).json({ message: "O e-mail é obrigatório!" });
            return;
        }

        if (!senha) {
            res.status(422).json({ message: "A senha é obrigatória!" });
            return;
        }

        // checa se email já está cadastrado
        const user = await Aluno.findOne({ email: email }) || await Empresa.findOne({ email: email});
        

        if (!user) {
            res.status(422).json({ message: "Não há usuário cadastrado com este e-mail!" });
            return;
        }

        // checa se a senha está correta
        const checaSenha = await bcrypt.compare(senha, user.senha);
    

        if (!checaSenha) {
            res.status(422).json({ message: "Senha invalida!" });
            return;
        }

        await createUserToken(user, req, res);
    }
}