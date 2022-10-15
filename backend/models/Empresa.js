import mongoose from '../db/conn.js';

const { Schema } = mongoose;

const Empresa = mongoose.model(
    'Empresa',
    new Schema({
        nomeEmpresa: {
            type: String,
            required: true,
        },
        nomeRepresentante: {
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
        telefone: {
            type: Number,
            required: true,
        },
        cnpj:{
            type: String,
            required: true,
        },
        role:{
            type: Number,
            required: true,
        },
      },
      {timestamps: [{ createdAt: new Date(new Date()) }, { updatedAt: new Date(new Date()) }]},
    ),
)


export default Empresa;