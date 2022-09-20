import jwt from 'jsonwebtoken';

const createUserToken = async (user, req, res) => {

    // create a token
    const token = jwt.sign({ nome: user.nome, id: user._id, }, "qafsafvsdsfwe"); // secret, string para deixar o token unico

    // return token
    res.status(200).json({ message: "Você está autenticado", token: token, userId: user._id,});  
}

export default createUserToken;