const getToken = (req) => {
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1] // criar um array e pegar o segundo elemento
    console.log(token)
    return token
}

export default getToken
