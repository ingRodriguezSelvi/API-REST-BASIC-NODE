import {v4 as uuidv4} from "uuid";
import path from "path";
import {fileURLToPath} from "url";
import fs from "fs";
import {response} from "express";

const __filename = fileURLToPath(import.meta.url);


export const uploadFiles = (files, extensionsValidates = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

    return new Promise((resolve, reject) => {
        const {archivo} = files;
        const nameCut = archivo.name.split('.');
        const ext = nameCut[nameCut.length - 1];

        //Validate extension
        if (!extensionsValidates.includes(ext)) {
            return reject(`Extension no permitted ${extensionsValidates} `);
        }
        const nameTemp = uuidv4() + '.' + ext;
        const uploadPath = path.join(path.dirname(__filename), '../uploads/', folder, nameTemp);

        archivo.mv(uploadPath, function (err) {
            if (err) {
                return reject(err)
            }
            resolve(nameTemp);
        });
    });
}

export const clearImg = (model, collection) => {
    if (model.img) {
        const pathImg = path.join(path.dirname(__filename), '../uploads', collection, model.img)
        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg);
        }
    }
}

export const clearCloudinaryImg = (model, collection, cloudinary) => {

    if (model.img) {
        const nameArr = model.img.split('/');
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split('.');

        cloudinary.uploader.destroy(public_id);
    }
}
export const getImg = (model, collection, res = response) => {
    if (model.img) {
        const pathImg = path.join(path.dirname(__filename), '../uploads', collection, model.img)
        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg)
        }

    }
    const pathImg = path.join(path.dirname(__filename), '../assets', 'no-image.jpg')
    if (fs.existsSync(pathImg)) {
        return res.sendFile(pathImg)
    }
}

