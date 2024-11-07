import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    console.log("Middleware activo");
    let token = req.headers.authorization;
    const secretKey = 'backAtIt100$';

    if (!token) {
        console.log('Token no proporcionado');
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        token = token.replace("Bearer ", "");
        const decodedPayload = await jwt.verify(token, secretKey);
        req.user = decodedPayload; // Asigna el payload del token a la solicitud
        next();
    } catch (error) {
        console.error('Error al verificar el token', error);
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

export default authMiddleware;
