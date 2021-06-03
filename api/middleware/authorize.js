import jwt from "jsonwebtoken"

import dotenv from 'dotenv'
dotenv.config()

module.exports = async ( req , res, next) => {
    try{
        const jwtToken = req.header("Authorization");

        const token = jwtToken && jwtToken.split(' ')[1];
        if(!token){
            return res.status(403).json("Not Authorize");
        }
        const payload = jwt.verify(token, process.env.jwtSecret);
        req.user = payload.user;
        next();
    }catch(err){
        console.error(err.msg);
        return res.status(403).json("Not Authorize");
    }
};