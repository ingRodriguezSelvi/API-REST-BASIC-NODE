import {Role} from "../models/role.models.js";
import {User} from "../models/user.models.js";
import {Category, Product} from "../models/index.js";

export const isRoleValid = async(rol) => {
    const existRole = await Role.findOne({rol});
    if (!existRole) {
        throw new Error(`The role ${rol} does not exist`);
    }
}

export const emailExist = async(email) => {
    const existsEmail = await User.findOne({email});
    if (existsEmail) {
        throw new Error(`The email ${email} already exists`);
    }
}

export const userExistById = async(id) => {
    const existsUser = await User.findById(id);
    if (!existsUser) {
        throw new Error(`The user with id ${id} does not exist`);
    }
}

export const categoryExistById = async(id) => {
    const existsCategory = await Category.findById(id);
    if (!existsCategory) {
        throw new Error(`The category with id ${id} does not exist`);
    }
}

export const ProductExistById = async(id) => {
    const existsProduct = await Product.findById(id);
    if (!existsProduct) {
        throw new Error(`The product with id ${id} does not exist`);
    }
}
/**
 * Validar colecciones permitidas
 */
export const collectionsPermite = (collection = '',collections =[]) =>{
    const include = collections.includes(collection);
    if (!include){
        throw new Error(`The collection ${collection} is no permite`)
    }
    return true;
}
