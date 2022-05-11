const jwt = require('jsonwebtoken');

const vToken = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).json({error: 'Acceso Denegado'}) //if frontend don't send a toke, de api stops here
    }
    try {
        const verify = jwt.verify(token, procces.env.TOKEN); //already have readed a token, here we verify it with the TOKEN SECRET
        req.user = verify;
        next();
    } catch (error) {
        return res.status(401).json({error: 'Token no Valido'})
    }
}

module.exports = vToken;