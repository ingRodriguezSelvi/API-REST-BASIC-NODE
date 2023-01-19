import {User} from "../models/user.models.js";
import {request, response} from "express";
import jwt from "jsonwebtoken";


export const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'There is no token in the request'
        });
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.uid = uid;
        const user = await User.findById(uid);
        if (!user) {
            return res.status(401).json({
                msg: 'Token not valid - user does not exist in DB'
            });
        }
        if (user.deleted) {
            return res.status(401).json({
                msg: 'Token not valid - user with state: false'
            });
        }
        req.userAuth = user;

        next();
    }
    catch (e) {
        console.log(e);
        res.status(401).json({
            msg: 'Token is not valid'
        });
    }
}