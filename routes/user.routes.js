import {Router} from "express";
import {usersDelete, usersGet, usersPatch, usersPost, usersPut} from "../controllers/users.controllers.js";

const userRouter = Router();

userRouter.get('/', usersGet);

userRouter.put('/:id', usersPut);

userRouter.post('/', usersPost);

userRouter.delete('/', usersDelete);

userRouter.patch('/', usersPatch);

export default userRouter;