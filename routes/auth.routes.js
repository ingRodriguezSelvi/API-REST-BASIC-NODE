import {Router} from "express";
import {check} from "express-validator";

import * as authController from "../controllers/auth.controllers.js";
import {validateErrors} from "../middlewares/validate-errors.js";

const authRoutes = Router();

authRoutes.post(
    '/login',
    [
        check('email', 'Email is required').not().isEmpty(),
        check('email', 'Email no valid').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        check('password', 'Password is incorrect' +
            '').isLength({min: 6}),
        validateErrors
    ],
    authController.login);

authRoutes.post(
    '/google',
    [
        check('id_token', 'id_token is required').not().isEmpty(),
        validateErrors
    ],
    authController.googleSignIn);


export default authRoutes;