import mongoose from '../db/conn.js';

const {Schema} = mongoose;

const Vaga = mongoose.model(
    'Vagas',
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
        escolaridade: {
            type: String,
            required:true,
        },
        turno: {
            type: String,
            required:true,
        },
        remunerado:{
            type: Boolean,
            required:true,
        },
        observacoes: {
            type: String,
        },
        ativa: {
            type: Boolean,
        },
        empresa: Object,
        aluno: Object,
      },
      { timestamps: true }    
    ),
    
)
export default Vaga;