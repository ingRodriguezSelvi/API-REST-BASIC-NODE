import {Router} from "express";

import {check} from "express-validator";
import {usersDelete, usersGet, usersPatch, usersPost, usersPut} from "../controllers/users.controller.js";

import {emailExist, isRoleValid, userExistById} from "../helpers/db-validators.js";
import {hasRole, validateErrors, validateJWT} from "../middlewares/index.js";


const userRouter = Router();

userRouter.get('/', usersGet);

userRouter.put('/:id', [
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(userExistById),
    validateErrors,
], usersPut);

userRouter.post('/', [
    check('email', 'Email no valid').isEmail(),
    check('email').custom(emailExist),
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({min: 6}),
    check('role').custom(isRoleValid),
    validateErrors
], usersPost);

userRouter.delete('/:id', [
    validateJWT,
    //isAdminRole,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(userExistById),
    validateErrors
],usersDelete);

userRouter.patch('/', usersPatch);

export default userRouter;
