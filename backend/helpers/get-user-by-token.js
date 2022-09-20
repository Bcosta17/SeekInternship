import jwt from 'jsonwebtoken';

import Aluno from '../models/Aluno.js';
// import Empresa from '../models/Empresa.js';

const getUserByToken = async (token) => {
    if (!token) {
        return res.status(401).json({ message: 'access denied' });
    }

    const decoded = jwt.verify(token, 'qafsafvsdsfwe');

    const alunoId = decoded.id;

    
    const aluno = await Aluno.findOne({ _id: alunoId });
    // const empresa = await User.findOne({ _id: alunoId });
    

    return aluno;
}
export default getUserByToken;