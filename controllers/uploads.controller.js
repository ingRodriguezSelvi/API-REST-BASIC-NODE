

import {response, request} from "express";
import {clearImg, getImg, uploadFiles} from "../helpers/index.js";
import {User,Product} from "../models/index.js";
import { v2 as cloudinary } from 'cloudinary'
import {clearCloudinaryImg} from "../helpers/upload-files.js";

cloudinary.config({
    cloud_name: 'dvhmifyvx',
    api_key: '774657953668173',
    api_secret: '_ttf2pOkA8uKDZ3GDMtH94rPgq8',
    secure: true
});

export const uploadFile = async (req = request, res = response) => {
    try {
        const nameFile = await uploadFiles(req.files, undefined, 'imgs')
        res.json({nameFile})
    } catch (msg) {
        res.status(400).json({msg})
    }

}

export const updateImg = async (req = request, res = response) => {

    const {id, collection} = req.params;
    let model;

    switch (collection){
        case 'user':
            model = await  User.findById(id);
            if (!model){
                return res.status(400).json({
                    msg:`No exists a user with id ${id}`
                })
            }
            break
        case 'product':
            model = await  Product.findById(id);
            if (!model){
                return res.status(400).json({
                    msg:`No exists a product with id ${id}`
                })
            }
            break
        default:
            return res.status(500).json({msg:'Se me olvido validar aca'})
    }

    // Clear img previous
    clearImg(model,collection)

    model.img = await uploadFiles(req.files, undefined, collection)
    await model.save();
    res.json(model)
}

export const updateCloudinaryImg = async (req = request, res = response) => {

    const {id, collection} = req.params;
    let model;

    switch (collection){
        case 'user':
            model = await  User.findById(id);
            if (!model){
                return res.status(400).json({
                    msg:`No exists a user with id ${id}`
                })
            }
            break
        case 'product':
            model = await  Product.findById(id);
            if (!model){
                return res.status(400).json({
                    msg:`No exists a product with id ${id}`
                })
            }
            break
        default:
            return res.status(500).json({msg:'Se me olvido validar aca'})
    }

    // Clear img previous

    try{
        const { tempFilePath } = req.files.archivo;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

        clearCloudinaryImg(model,collection,cloudinary);

        model.img = secure_url
        await model.save();
        res.json(model)
    } catch (e) {
        console.log(e)
        res.status(500).json({error:e})
    }

}

export const showImg = async( req = request, res= response ) =>{

    const {id, collection} = req.params;
    let model;

    switch (collection){
        case 'user':
            model = await  User.findById(id);
            if (!model){
                return res.status(400).json({
                    msg:`No exists a user with id ${id}`
                })
            }
            break
        case 'product':
            model = await  Product.findById(id);
            if (!model){
                return res.status(400).json({
                    msg:`No exists a product with id ${id}`
                })
            }
            break
        default:
            return res.status(500).json({msg:'Se me olvido validar aca'})
    }

    // Clear img previous
    try {
        getImg(model,collection,res);
    }catch (error){
        res.json({
            msg: 'Falta place holder'
        })
    }
}

