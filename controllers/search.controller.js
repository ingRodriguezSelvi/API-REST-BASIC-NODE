import {request, response} from "express";
import mongoose from 'mongoose';
import {Category, Product, User} from "../models/index.js";

const collectionsPermit = [
    'user',
    'category',
    'product',
    'role'
]

const searchUser = async (term = '', res = response) => {

    const isMongoID = mongoose.Types.ObjectId.isValid(term);

    if (isMongoID) {
        const user = await User.findById(term);
        return res.json({
            results: (user) ? [user] : []
        });
    }

    const regex = new RegExp(term, 'i') // permite busqueda dinamica

    const users = await User.find({
        $or: [{name: regex}, {email: regex}],
        $and: [{deleted: false}]
    });
    return res.json({
        results: users
    })
}

const searchProducts = async (term = '', res = response) => {
    const isMongoID = mongoose.Types.ObjectId.isValid(term);
    if (isMongoID) {
        const product = await Product.findById(term).populate('category','name');
        return res.json({
            results: (product) ? [product] : []
        });
    }

    const regex = new RegExp(term, 'i') // permite busqueda dinamica

    const products = await Product.find({name: regex,deleted: false}).populate('category','name');
    return res.json({
        results: products
    })
}

const searchCategory = async (term = '', res = response) => {
    const isMongoID = mongoose.Types.ObjectId.isValid(term);

    if (isMongoID) {
        const category = await Category.findById(term);
        return res.json({
            results: (category) ? [category] : []
        });
    }

    const regex = new RegExp(term, 'i') // permite busqueda dinamica

    const categories = await Category.find({name: regex,deleted:true});
    return res.json({
        results: categories
    })
}


export const search = async (req = request, res = response) => {

    const {collection, term} = req.params

    if (!collectionsPermit.includes(collection)) {
        return res.status(400).json({
            msg: 'Collection no exist'
        })
    }

    switch (collection) {
        case 'user':
            await searchUser(term, res)
            break;
        case 'category':
            await searchCategory(term, res)
            break;
        case 'product':
            await searchProducts(term, res)
            break;
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            })
    }
}
