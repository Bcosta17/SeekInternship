import Vaga from '../models/Vaga.js';

// helpers
import getToken from '../helpers/get-token.js';
import getUserByToken from '../helpers/get-user-by-token.js';
import ObjectId from 'mongoose';
export default class VagaController {
    static async create(req, res) {

        const token = getToken(req);

        const empresa = await getUserByToken(token);

        if (empresa.role !== 1) {
            return res.status(401).json({ message: 'acesso negado!' });
        }

        const { nome, descricao, requisitos, curso, turno, remunerado, observacoes } = req.body;

        // validations
        if (!nome) {
            res.status(422).json({ message: "O campo nome da vaga é obrigatório!" });
            return;
        }
        if (!descricao) {
            res.status(422).json({ message: "O campo descrição é obrigatório!" });
            return;
        }
        if (!requisitos) {
            res.status(422).json({ message: "O campo requisitos é obrigatório!" });
            return;
        }
        if (!curso) {
            res.status(422).json({ message: "O campo curso é obrigatório!" });
            return;
        }
        if (!turno) {
            res.status(422).json({ message: "O campo turno é obrigatório!" });
            return;
        }
        if (!remunerado) {
            res.status(422).json({ message: "O campo remunerado é obrigatório!" });
            return;
        }

        //


        const vaga = new Vaga({
            nome,
            descricao,
            requisitos,
            curso,
            turno,
            remunerado, 
            observacoes,
            empresa,
        });

        try {
            const novaVaga = await vaga.save();
            res.status(201).json({
                message: 'Vaga criada com sucesso!',
                novaVaga,
            });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async getAll(req, res) {
        const vagas = await Vaga.find().sort('-createdAt').populate({ path: 'empresa', select: '-senha' });// (-) pegar ordem crescente

        res.status(200).json({ data: vagas });
    }

    static async getVagasPorEmpresa(req, res) {

        // 
        const token = getToken(req);
        const empresa = await getUserByToken(token);

        if (empresa.role !== 1) {
            return res.status(401).json({ message: 'acesso negado!' });
        }
        const vagas = await Vaga.find({ 'empresa': empresa._id })
            .sort('-createdAt').select('-senha')
            .populate({ path: 'alunos', select: '-senha' }); 

        res.status(200).json({ data: vagas }) 

    }
    static async getVagasPorAluno(req, res) {

        // 
        const token = getToken(req);
        const aluno = await getUserByToken(token);

        if (aluno.role !== 0) {
            return res.status(401).json({ message: 'acesso negado!' });
        }
        const vagas = await Vaga.find({ 'aluno._id': aluno._id })
            .sort('-createdAt').select('-senha')
            .populate({ path: 'empresa', select: '-senha' });
        
        res.status(200).json({ data: vagas });

    }

    static async getVagaById(req, res) {
        const id = req.params.id;

        // 
        if (!ObjectId.isValidObjectId(id)) {
            res.status(422).json({ message: 'Id não é valido!' });
            return;
        }

        // 
        const vaga = await Vaga.findOne({ _id: id }).sort('-createdAt').populate({ path: 'empresa', select: '-senha' });// (-) pegar ordem crescente;

        if (!vaga) {
            res.status(404).json({ message: 'Vaga não encontrada!' });
            return;
        }

        res.status(200).json({ data: vaga });
    }

    static async deleteVagaById(req, res) {
        const id = req.params.id;

        // 
        if (!ObjectId.isValidObjectId(id)) {
            res.status(422).json({ message: 'Id é invalido!' });
            return;
        }

        // check se o usuário logado foi o que registro a vaga
        const token = getToken(req);
        const user = await getUserByToken(token);

        if (user.role !== 1) {
            return res.status(401).json({ message: 'acesso negado!' });
        }

        const vaga = await Vaga.findOne({ _id: id });


        if (!vaga) {
            res.status(404).json({ message: 'Vaga não encontrada' });
            return;
        }

        if (vaga.empresa._id.toString() !== user._id.toString()) {
            res.status(422).json({ message: 'Houve um problema em processar sua solicitação!' });
            return;
        }

        await Vaga.findByIdAndRemove(id);

        res.status(200).json({ message: 'Vaga deletada com sucesso!' });

    }

    static async updateVaga(req, res) {
        const id = req.params.id;

        const token = getToken(req);
        const user = await getUserByToken(token);

        if (user.role !== 1) {
            return res.status(401).json({ message: 'acesso negado!' });
        }

        const { nome, descricao, requisitos, curso, turno, remunerado, observacoes } = req.body;

        if (!ObjectId.isValidObjectId(id)) {
            res.status(422).json({ message: 'Id é invalido' });
            return;
        }


        const vaga = await Vaga.findOne({ _id: id });

        if (!vaga) {
            res.status(404).json({ message: 'Vaga não encontrada' });
            return;
        }



        if (vaga.empresa._id.toString() !== user._id.toString()) {
            res.status(404).json({ message: 'Houve um problema em processar sua solicitação!' });
            return;
        }

        // validations
        if (!nome) {
            res.status(422).json({ message: "O campo nome da vaga é obrigatório!" });
            return;
        }
        vaga.nome = nome;

        if (!descricao) {
            res.status(422).json({ message: "O campo descrição é obrigatório!" });
            return;
        }
        vaga.descricao = descricao;

        if (!requisitos) {
            res.status(422).json({ message: "O campo requisitos é obrigatório!" });
            return;
        }
        vaga.requisitos = requisitos;

        if (!curso) {
            res.status(422).json({ message: "O campo curso é obrigatório!" });
            return;
        }
        vaga.curso = curso;

        if (!turno) {
            res.status(422).json({ message: "O campo turno é obrigatório!" });
            return;
        }
        vaga.turno = turno;

        if (!remunerado) {
            res.status(422).json({ message: "O campo remunerado é obrigatório!" });
            return;
        }
        vaga.remunerado = remunerado;

        vaga.observacoes = observacoes;

        try {

            await Vaga.findOneAndUpdate(
                { _id: vaga._id },
                { $set: vaga },
                { new: true },
            );

            res.status(200).json({ message: 'vaga atualizada com sucesso!' });

        } catch (error) {

            res.status(500).json({ message: error.message });
        }
    }

    static async candidatarVaga(req, res) {
        const id = req.params.id;

        if (!ObjectId.isValidObjectId(id)) {
            res.status(422).json({ message: 'Id é invalido' });
            return;
        }

        const vaga = await Vaga.findOne({ _id: id });
        const alunos = vaga.alunos;

        if (!vaga) {
            res.status(404).json({ message: 'Vaga não encontrada' });
            return;
        }

        const token = getToken(req);
        const user = await getUserByToken(token);

        if (user.role !== 0) {
            return res.status(401).json({ message: 'acesso negado!' });
        }

        for (const aluno of alunos) {
            if (aluno._id.equals(user._id)) {
                res.status(422).json({ message: 'Você já se candidatou a está vaga' })
                return;
            }
        }
        alunos.push(user._id);
        await vaga.save();

        res.status(200).json({ message: 'Voce se candidatou com sucesso, agora aguarde o retorno da empresa!' });
        return;

    }

    static async removerCandidatar(req, res) {
        const id = req.params.id;

        if (!ObjectId.isValidObjectId(id)) {
            res.status(422).json({ message: 'Id é invalido' });
            return;
        }

        const vaga = await Vaga.findOne({ _id: id });
        const alunos = vaga.alunos;

        if (!vaga) {
            res.status(404).json({ message: 'Vaga não encontrada' });
            return;
        }

        const token = getToken(req);
        const user = await getUserByToken(token);

        if (user.role !== 0) {
            return res.status(401).json({ message: 'acesso negado!' });
        }

    
        alunos.remove(user._id);
        await Vaga.findOneAndUpdate(
            { _id: vaga._id },
            { $set: vaga },
            { new: true },
        );
       
        res.status(200).json({ message: 'Vaga cancelada com sucesso!' });
        return;

    }

}