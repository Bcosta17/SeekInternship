import { Aluno } from "./Aluno";
import { Empresa } from "./Empresa";

export interface Vaga{
    _id: string;
    nome: string;
    descricao: string;
    requisitos: string;
    escolaridade: string;
    ativa: boolean;
    turno: string;
    alunos: [Aluno];
    empresa: Empresa;
    observacoes?: string;
    remunerado: boolean;
    createdAt?: string;
    updatedAt?: string;
};

