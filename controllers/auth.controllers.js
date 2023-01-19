import {response} from "express";
import bcryptjs from "bcryptjs";
import {User} from "../models/user.models.js";
import {generateJWT} from "../helpers/generate-jwt.js";

export const login = async (req, res = response) => {

    const {email, password} = req.body;

    try {

        // Verify email
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                msg: 'Email or password incorrect - email'
            });
        }
        // Verify user active
        if (user.deleted) {
            return res.status(400).json({
                msg: 'Email or password incorrect - state: false'
            });
        }
        // Verify password
         const validPassword = bcryptjs.compareSync(password, user.password);

        // Generate JWT
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