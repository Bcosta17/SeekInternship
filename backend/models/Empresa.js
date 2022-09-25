import mongoose from '../db/conn.js';

const { Schema } = mongoose;

const Empresa = mongoose.model(
    'Empresas',
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
      },
      { timestamps: true}
    ),
)


export default Empresa;