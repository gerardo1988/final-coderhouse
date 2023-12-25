import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = new mongoose.Schema({
    
    title:{
        type: String,
        require: [true,"el titulo es requerido"]
    },
    description:{
        type: String,
        require: [true,"la descripción es requerida"]
    },
    price:{
        type: Number,
        require: [true,"el precio es requerido"]
    },
    code:{
        type: String,
        require: [true,"el codigo es requerido"]
    },
    stock:{
        type: Number,
        require: [true,"el numero de stock es requerido"]
    },

    cart:[
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Carts'
         }
    ]

});

Schema.plugin(mongoosePaginate);

export const ProductsModel = mongoose.model("Products", Schema);