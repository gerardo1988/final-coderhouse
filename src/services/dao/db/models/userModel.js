import mongoose from "mongoose";

const collection = 'users';

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email:{
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    loggedBy:{
        type:String,
        required: false
    },
    role:{
        type: String,
        default: 'premium',
        required: false,
        enum: ['normal', 'premium']
    },
    cart: [
        {
           type: mongoose.SchemaTypes.ObjectId,
           ref: 'Carts'
        }
    ]
});

 export const userModel = mongoose.model(collection,schema);