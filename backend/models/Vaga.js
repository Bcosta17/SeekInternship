import mongoose from '../db/conn.js';

const {Schema} = mongoose;

const Vaga = mongoose.model(
    'Vaga',
    new Schema({

        nome:{
            type: String,
            required:true,
        },
        descricao:{
            type: String,
            required:true,
        },
        requisitos: {
            type: String,
            required:true,
        },
        curso: {
            type: String,
            required:true,
        },
        turno: {
            type: String,
            required:true,
        },
        remunerado:{
            type: String,
            required:true,
        },
        observacoes: {
            type: String,
        },
        ativa: {
            type: Boolean,
        },
        empresa: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Empresa',
            required:true
        },
        alunos:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Aluno',
            }]
      },
      {timestamps: [{ createdAt: new Date(new Date()) }, { updatedAt: new Date(new Date()) }]},
    ),
    
)
export default Vaga;