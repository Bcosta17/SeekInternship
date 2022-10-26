import { Aluno } from "./Aluno";
import { Empresa } from "./Empresa";

export interface Vaga{
    _id: string;
    nome: string;
    descricao: string;
    requisitos: string;
    curso: string;
    ativa: boolean;
    turno: string;
    alunos: [Aluno];
    empresa: Empresa;
    observacoes?: string;
    remunerado: number;
    createdAt?: string;
    updatedAt?: string;
};

