import Aluno from "../models/Aluno.js";
import Empresa from "../models/Empresa.js";
import crypto from "crypto";
import transporter from "../helpers/send-email-config.js"
import bcrypt from "bcrypt";

export default class PasswordRecoveryControllers{
    static async forgotPassword(req, res) {
       const {email} = req.body;

        const user = await Empresa.findOne({email}) || await Aluno.findOne({email});

        if(!user){
            return res.status(400).send({message: 'Email não encontrado, tente novamente!'});

        }

        const token = crypto.randomUUID()
        // expiração do token
        const now = new Date();
        now.setHours(now.getHours() + 1);
        

        try {
            //Retorna os dados atualizado do aluno.
            
            if(user.role==1){
                await Empresa.findOneAndUpdate(
                    { _id: user._id },
                    { $set:{ 
                        tokenSenha: token,
                        tokenSenhaExpires: now, 
                    }
                    },
                  
                );
            }else{
                await Aluno.findOneAndUpdate(
                    { _id: user._id },
                    { $set:{ 
                        tokenSenha: token,
                        tokenSenhaExpires: now, 
                    }
                    },
                  
                );
            }
           
            transporter.sendMail({
               
                subject: 'Recuperação de Senha',
                from:  'SeekInternship <seekinternship@gmail.com>',
                to: user.email,
                html: ' <p style="font-size: 20px; color: black;">Olá, <br> <br> clique <a href="http://localhost:4200/login/mudar_senha/'+token+'">aqui</a> para altera sua senha <br> <br> Caso não consiga, tente copiar o link abaixo e colar no seu navegador. <br> <br> http://localhost:4200/login/mudar_senha/'+token+' <br> <br> Este link só é válido por 1 horas.</p>'      
        })
            res.status(200).json({ message: 'Email enviado com sucesso!' });

        } catch (error) {

            res.status(500).json({ message: error.message });
        }
    }

    static async resetPassword(req, res){
        const { tokenSenha, senha } = req.body;
        
        
        // inclui os campos q estão com select:false
        const user = await Empresa.findOne({tokenSenha}).select('+tokenSenha tokenSenhaExpires') || await Aluno.findOne({tokenSenha}).select('+tokenSenha tokenSenhaExpires');

        if(!user || !tokenSenha){
            return res.status(400).send({message: "Token inválido, gere um novo link"});
        }
        
        const now = new Date();
        if(now > user.tokenSenhaExpires ){
            return res.status(400).send({message: "O link expirou, gere um novo!"});
        }

        try {

            const salt = await bcrypt.genSalt(12);
            const senhaHash = await bcrypt.hash(senha, salt);
            user.senha = senhaHash;
    
            await user.save();

            res.status(200).json({ message: 'Senha alterada com sucesso!'});

        } catch (error) {

            res.status(500).json({ message: error });

        }

   
    }
}