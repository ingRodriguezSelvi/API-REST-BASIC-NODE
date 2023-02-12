import {Schema, model} from "mongoose";

const ProductSchema = new Schema({
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
    },
    price: {
        type:Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description:{ type: String },
    inStock:{ type:Boolean, default:true }

});

ProductSchema.methods.toJSON = function () {
    const {__v,deleted,...data} = this.toObject();
    return data;
}

export const Product = model('Product', ProductSchema);
