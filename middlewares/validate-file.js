import {request, response} from "express";

export const validateFile = (req = request , res = response, next) =>{

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).send({msg: 'No files were uploaded.'});
    }
    next();
}
