import Vaga from '../models/Vaga.js';

// helpers
import getToken from '../helpers/get-token.js';
import getUserByToken from '../helpers/get-user-by-token.js';
import ObjectId  from 'mongoose';




export default class VagaController {
    static async create(req,res){
        const {nome, descricao, requisitos, escolaridade, turno, remunerado, observacoes} = req.body;

        const ativa = true;
        
        // validations
        if(!nome) {
            res.status(422).json({ message: "O campo nome da vaga é obrigatório!"});
            return;
           }
           if(!descricao) {
            res.status(422).json({ message: "O campo descrição é obrigatório!"});
            return;
           }
           if(!requisitos) {
            res.status(422).json({ message: "O campo requisitos é obrigatório!"});
            return;
           }
           if(!escolaridade) {
            res.status(422).json({ message: "O campo escolaridade é obrigatório!"});
            return;
           }
           if(!turno) {
            res.status(422).json({ message: "O campo turno é obrigatório!"});
            return;
           }
           if(!remunerado) {
            res.status(422).json({ message: "O campo remunerado é obrigatório!"});
            return;
           }
           
        //
        const token = getToken(req);
        const empresa = await getUserByToken(token); 

        const vaga = new Vaga({
            nome, 
            descricao, 
            requisitos, 
            escolaridade,
            turno,
            remunerado,
            observacoes,
            ativa,       
            empresa: {
                _id: empresa._id,
                nome: empresa.nomeEmpresa,
            },
        });

        try {
            const novaVaga = await vaga.save();
            res.status(201).json({
                message: 'Vaga criada com sucesso!',
                novaVaga,
            });
        } catch (error) {
            res.status(500).json({ message : error});
        }
    }

    static async getAll(req,res){
        const vagas = await Vaga.find().sort('-createdAt');// (-) pegar ordem crescente
        
        res.status(200).json({ vagas: vagas });
    }

    static async getVagasPorEmpresa(req, res) {

        // 
        const token = getToken(req);
        const empresa = await getUserByToken(token);

        const vagas = await Vaga.find({'empresa._id': empresa._id}).sort('-createdAt');
        
        res.status(200).json({ vagas})
 
    }
    static async getVagasPorAluno(req, res) {

        // 
        const token = getToken(req);
        const aluno = await getUserByToken(token);

        const vagas = await Vaga.find({'aluno._id': aluno._id}).sort('-createdAt');
        
        res.status(200).json({ vagas});
 
    }

    static async getVagaById(req, res) {
        const id = req.params.id;

        // 
        if (!ObjectId.isValidObjectId(id)) {
            res.status(422).json({ message: 'Id não é valido!'});
            return;
        }

        // 
        const vaga = await Vaga.findOne({_id: id});

        if (!vaga) {
            res.status(404).json({ message: 'Vaga não encontrada!' });
            return;
        }

        res.status(200).json({ vaga: vaga });      
    }

    static async deleteVagaById(req, res) {
        const id = req.params.id;

         // 
        if (!ObjectId.isValidObjectId(id)) {
            res.status(422).json({ message: 'Id é invalido!'});
            return;
        }

        // 
        const vaga = await Vaga.findOne({_id: id});

        if (!vaga) {
            res.status(404).json({ message: 'Vaga não encontrada' });
            return;
        }

        // check se o usuário logado foi o que registro a vaga
        const token = getToken(req);
        const user = await getUserByToken(token);

        if (vaga.empresa._id.toString() !== user._id.toString()) {
            res.status(422).json({message: 'Houve um problema em processar sua solicitação!'});
            return;
        }

        await Vaga.findByIdAndRemove(id);

        res.status(200).json({message: 'Vaga deletada com sucesso!'});

    }
    static async updateVaga(req, res) {
        const id = req.params.id;

        const {nome, descricao, requisitos, escolaridade, turno, remunerado, observacoes} = req.body;
   
        if (!ObjectId.isValidObjectId(id)) {
            res.status(422).json({ message: 'Id é invalido'});
            return;
        }
        
        
        const vaga = await Vaga.findOne({_id: id});

        if (!vaga) {
            res.status(404).json({ message: 'Vaga não encontrada' });
            return;
        }

        const token = getToken(req);
        const user = await getUserByToken(token);

        if (vaga.empresa._id.toString() !== user._id.toString()) {
            res.status(404).json({message: 'Houve um problema em processar sua solicitação!'});
            return;
        }

         // validations
         if(!nome) {
            res.status(422).json({ message: "O campo nome da vaga é obrigatório!"});
            return;
        }
        vaga.nome = nome;
        
        if(!descricao) {
           res.status(422).json({ message: "O campo descrição é obrigatório!"});
           return;
        }
        vaga.descricao = descricao;

        if(!requisitos) {
            res.status(422).json({ message: "O campo requisitos é obrigatório!"});
            return;
        }
        vaga.requisitos= requisitos;

        if(!escolaridade) {
            res.status(422).json({ message: "O campo escolaridade é obrigatório!"});
            return;
        }
        vaga.escolaridade= escolaridade;

        if(!turno) {
            res.status(422).json({ message: "O campo turno é obrigatório!"});
            return;
        }
        vaga.turno = turno;

        if(!remunerado) {
            res.status(422).json({ message: "O campo remunerado é obrigatório!"});
            return;
        }
        vaga.remunerado = remunerado;

        vaga.observacoes = observacoes;

        try {
            
           await Vaga.findOneAndUpdate(
                {_id: vaga._id},
                {$set: vaga},
                {new: true},
            );

            res.status(200).json({message: 'vaga atualizada com sucesso!'});
           
        } catch (error) {
          
            res.status(500).json({message:error.message});
        }
    }

    static async candidatarVaga(req, res){

        const id = req.params.id;

        
        if (!ObjectId.isValidObjectId(id)) {
            res.status(422).json({ message: 'Id é invalido'});
            return;
        }
        
        const vaga = await Vaga.findOne({ _id: id});

        if (!vaga) {
            res.status(404).json({ message: 'Vaga não encontrada' });
            return;
        }

        const token = getToken(req);
        const user = await getUserByToken(token);

        // checa se o aluno já se candidatou a vaga
        if(vaga.aluno){ 
            if(vaga.aluno._id.equals(user._id)) {
                res.status(422).json({message: 'Você já se candidatou a está vaga'})
                return;
            }
        }

        // add um aluno na vaga 
        vaga.aluno = {
            _id: user._id,
            nome: user.nome,
        }

        await Vaga.findByIdAndUpdate(id,vaga);

        res.status(200).json({message: 'Voce se candidatou com sucesso, agora aguarde o retorno da empresa!'});
    }
    
    // static async concludeAdoption(req, res){
        
    //     const id = req.params.id;

    //        // check if id is valid
    //     if (!ObjectId.isValidObjectId(id)) {
    //         res.status(422).json({ message: 'ID is invalid'});
    //         return;
    //     }
        
    //     // check if the pet exists
    //     const pet = await Pet.findOne({ _id: id});

    //     if (!pet) {
    //         res.status(404).json({ message: 'Pet not found' });
    //         return;
    //     }

    //     // check if logged in user registered the pet
    //     const token = getToken(req);
    //     const user = await getUserByToken(token);

    //     if (pet.user._id.toString() !== user._id.toString()) {
    //         res.status(404).json({message: 'Houve um problema em processar sua solicitação!'});
    //         return;
    //     }

    //     pet.available = false;

    //     await Pet.findByIdAndUpdate(id,pet);

    //     res.status(200).json({message:'pet successfully adopted!'});

    // }
}