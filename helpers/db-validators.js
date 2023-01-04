import {Role} from "../models/role.models.js";
import {User} from "../models/user.models.js";

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