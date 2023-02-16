import {Router} from "express";
import {check} from "express-validator";
import {validateErrors, validateFile } from "../middlewares/index.js";
import {showImg, updateCloudinaryImg, uploadFile} from "../controllers/uploads.controller.js";
import {collectionsPermite} from "../helpers/db-validators.js";


const uploadsRouter = Router();

uploadsRouter.post( '/', uploadFile );

uploadsRouter.put( '/:collection/:id',[
    validateFile,
    check('id','The id don t is mongo id').isMongoId(),
    check('collection').custom(c =>collectionsPermite(c,['user','product'])),
    validateErrors
], updateCloudinaryImg );

uploadsRouter.get('/:collection/:id',[
    check('id','The id don t is mongo id').isMongoId(),
    check('collection').custom(c =>collectionsPermite(c,['user','product'])),
    validateErrors
], showImg)



export default uploadsRouter;
