import jwt from 'jsonwebtoken';

import Aluno from '../models/Aluno.js';
import Empresa from '../models/Empresa.js';

const getUserByToken = async (token) => {
    if (!token) {
        return res.status(401).json({ message: 'acesso negado!' });
    }

    const decoded = jwt.verify(token, 'qafsafvsdsfwe');

    const alunoId = decoded.id;
    const empresaId = decoded.id;

    
    const user = await Aluno.findOne({ _id: alunoId }) || await Empresa.findOne({ _id: empresaId });
    
    

    return user;
}
export default getUserByToken;