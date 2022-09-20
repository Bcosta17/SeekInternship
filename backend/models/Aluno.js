import mongoose from '../db/conn.js';

const { Schema } = mongoose;

const Aluno = mongoose.model(
    'Alunos',
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
        },
        telefone: {
            type: String,
            required: true,
        },
        cpf:{
            type: String,
            required: true,
        },
        interesses: {
            type: String,
            required: true,
        }
      },
      { timestamps: true}
    ),
)


export default Aluno;