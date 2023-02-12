import {Schema, model} from "mongoose";

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
        unique: true
    },
    deleted: {
        type:       Boolean,
        default:    false,
        required:   true
    },
    user:{
        type:       Schema.Types.ObjectId,
        ref:        'User',
        required:   true
    }
});

CategorySchema.methods.toJSON = function () {
    const {__v,...data} = this.toObject();
    return data;
}

export const Category = model('Category', CategorySchema);
