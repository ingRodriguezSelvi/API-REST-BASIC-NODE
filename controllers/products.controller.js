import {request, response} from "express";
import {Product} from "../models/index.js";

export const createProduct = async (req = request, res = response) => {

    try{
        const { data } = req.body;
        data.name = data.name.toUpperCase();
        const productDB = await Product.findOne({name: data.name});

        if (productDB) res.status(400).json({
            msg: `The product with name ${productDB.name}, exists`
        })

        data.user = req.userAuth._id

        const newProduct = await new Product(data);
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        console.log(error)
    }

}

export const getAllProducts = async( req = request, res = response) =>{
    try{
        const {limit = 5, from = 0} = req.query;
        const query = {deleted: false};
        console.log(query)
        const [total, products] = await Promise.all([
            Product.countDocuments({query}),
            Product.find( query )
                .populate('user','name')
                .skip(from)
                .limit(limit)
        ]);
        res.json({
            total,
            products
        });
    }catch (error) {
        res.status(500).json({
            error
        })
    }
}

export const getProductById = async( req = request, res = response ) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id).populate('user','name');
        res.json(product);
    }catch (error) {
        res.status(500).json({
            error
        })
    }
}

export const updateProductById = async ( req = request, res = response ) =>{
    try{
        const { id } = req.params;
        const { deleted,user, ...data } = req.body;
        data.name = data.name.toUpperCase();
        console.log(req)
        data.user = req.userAuth._id;
        const product = await Product.findByIdAndUpdate(id,data,{new:true});
        res.json(product)
    }catch (error) {
        res.status(500).json(error);
    }

}

export const deleteProductById = async ( req = request, res = response ) =>{
    try{
        const { id } = req.params;
        console.log(id)
        const productDeleted = await Product.findByIdAndUpdate(id,{deleted: true},{new:true});
        res.json(productDeleted)
    } catch (error){
        res.status(500).json({
            error
        });
    }
}
