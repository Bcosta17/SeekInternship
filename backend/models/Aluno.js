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
            type: Number,
            required: true,
        },
        cpf:{
            type: String,
            required: true,
        },
        interesses: {
            type: String,
            required: true,
        },
      },
      {timestamps: [{ createdAt: new Date(new Date()) }, { updatedAt: new Date(new Date()) }]},
    ),
)


export default Aluno;