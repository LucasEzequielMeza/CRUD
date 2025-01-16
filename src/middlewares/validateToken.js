import jwt from 'jsonwebtoken'; 
import { TOKEN_SECRET } from '../config.js'; 

export const authRequired = (req, res, next) => { 

    const token = req.cookies.token;  

    if (!token) return res.status(401).json({ message: 'Unauthorized' }); 

    jwt.verify(token, TOKEN_SECRET, (err, user) => { // verificamos el token
        if (err) return res.status(403).json({ message: 'Invalid token' }); 
        req.user = user; 
    })

    next();
}