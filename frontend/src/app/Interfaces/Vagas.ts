export interface Vaga{
    _id: string;
    nome: string;
    descricao: string;
    requisitos: string;
    escolaridade: string;
    ativa: boolean;
    turno: string;
    aluno: [object];
    empresa: object
    observacoes?: string;
    remunerado: boolean;
    createdAt?: string;
    updatedAt?: string;
};

