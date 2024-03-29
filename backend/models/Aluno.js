import mongoose from '../db/conn.js';
const { Schema } = mongoose;

const Aluno = mongoose.model(
    'Aluno',
    new Schema({
        nome: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        senha: {
            type: String,
            required: true,
           
        },
        curso:{
            type: String,
            required:true,
        },
        periodo:{
            type: Number,
            required:true,
        },
        turno:{
            type: String,
            required:true,
        },
        telefone: {
            type: Number,
            required: true,
        },
        cpf:{
            type: String,
            // required: true,
        },
        tokenSenha:{
            type:String,
            select:false
        },
        tokenSenhaExpires:{
            type: Date,
            select:false
        },
        role:{
            type: Number,
            required: true,
        },
      },
      {timestamps: [{ createdAt: new Date(new Date()) }, { updatedAt: new Date(new Date()) }]},
    ),)
export default Aluno;