import {Router} from "express";
import {search} from "../controllers/search.controller.js";

const searchRoutes = Router();

searchRoutes.get('/:collection/:term',search)

export default searchRoutes;


