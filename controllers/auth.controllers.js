import {response} from "express";
import bcryptjs from "bcryptjs";
import {User} from "../models/user.models.js";
import {generateJWT} from "../helpers/generate-jwt.js";
import {googleVerify} from "../helpers/google-verify.js";

export const login = async (req, res = response) => {

    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                msg: 'Email or password incorrect - email'
            });
        }
        if (user.deleted) {
            return res.status(400).json({
                msg: 'Email or password incorrect - state: false'
            });
        }
        const validPassword = bcryptjs.compareSync(password, user.password);
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong'
        });
    }
}

export const googleSignIn = async (req, res = response) => {

    const {id_token} = req.body;
    try {
        const {name,picture,email} = await  googleVerify(id_token);

        let user = await User.findOne({email});

        if(!user){
            const data = {
                name,
                email,
                img:picture,
                password:'null',
                role:'USER_ROLE',
                google:true,
            }
            user = new User(data);
            await user.save();
        }
        if (user.deleted){
            res.status(401).json({
                msg:'User deleted of app'
            })
        }

        const token = await generateJWT(user.id);

        res.json({
            msg: 'Google sign in',
            user,
            token
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg: 'The token no have verify',
            error
        })
    }
}