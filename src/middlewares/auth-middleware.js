import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    console.log("middleware")
    let token = req.headers.authorization;
    let payLoadOriginal = null;
    const secretKey = 'backAtIt100$';
    //console.log('token Origial: ', req);
    console.log('token Origial: ', token);
    if (token == null) {
        console.log('token nulo')
        return res.status(401).json({ error: 'Unauthorized'});
    } else {
        try {
            token = token.replace("Bearer " , "");
            payLoadOriginal = await jwt.verify(token, secretKey);
            req.user = payLoadOriginal;
            next();
        } catch(e){
            console.log('error al desencriptar token')
            return res.status(401).json({error: 'Unauthorized'})
        }
    }
}

export default authMiddleware;