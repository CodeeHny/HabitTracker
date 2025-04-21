import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js';

export const verifyJWT = async (req, res, next) => {
    try {
        let token = req.cookies?.accessToken;

        if(!token) return res.status(401).json({error: "Token not found || Unauthorized access"});

        let decodedToken = jwt.verify(token, process.env.JWT_SECRET );

        let user = await User.findById(decodedToken.userId).select('-password');

        if (!user) return res.status(401).json({error: "Invalid access token"});

        req.user = user

        next();        
    } catch (error) {
        console.log("Invalid access token");
        res.status(401).json({error: "Invalid access token "});
    }
}

// check if coookies present 
// if present -> check it is correct or not 
// if correct -> then req.user = user 