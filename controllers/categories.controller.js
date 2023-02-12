import {request, response} from "express";
import {Category} from "../models/index.js";

export const createCategory = async (req = request, res = response) => {
    const name = req.body.name.toUpperCase();
    const categoryDB = await Category.findOne({name});

    if (categoryDB) return res.status(400).json({
        msg: `The category with name ${categoryDB.name}, exists`
    });
    const data = {
        name,
        user:req.userAuth._id
    }

    const newCategory = await  new Category(data);
    await newCategory.save()

    res.status(201).json(newCategory);

}

export const getAllCategory = async( req = request, res = response) =>{
    try{
        const {limit = 5, from = 0} = req.query;
        const query = {deleted: false};
        console.log(query)
        const [total, categories] = await Promise.all([
            Category.countDocuments({query}),
            Category.find( query )
                .populate('user','name')
                .skip(from)
                .limit(limit)
        ]);
        res.json({
            total,
            categories
        });
    }catch (error) {
        res.status(500).json({
            error
        })
    }
}

export const getCategoryById = async( req = request, res = response ) => {
    try{
        const { id } = req.params;
        const category = await Category.findById(id).populate('user','name');
        res.json(category);
    }catch (error) {
        res.status(500).json({
            error
        })
    }
}

export const updateCategoryById = async ( req = request, res = response ) =>{
    try{
        const { id } = req.params;
        const { deleted,user, ...data } = req.body;
        data.name = data.name.toUpperCase();
        console.log(req)
        data.user = req.userAuth._id;
        const category = await Category.findByIdAndUpdate(id,data,{new:true});
        res.json(category)
    }catch (error) {
        res.status(500).json(error);
    }

}

export const deleteCategoryById = async ( req = request, res = response ) =>{
    try{
        const { id } = req.params;
        console.log(id)
        const categoryDeleted = await Category.findByIdAndUpdate(id,{deleted: true},{new:true});
        res.json(categoryDeleted)
    } catch (error){
        res.status(500).json({
            error
        });
    }
}
