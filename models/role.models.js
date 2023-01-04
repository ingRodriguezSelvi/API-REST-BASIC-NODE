import {Schema, model} from "mongoose";

const RoleSchema = new Schema({
    rol: {
        type: String,
        required: [true, 'The role is required']
    }
});

export const Role = model('Role', RoleSchema);