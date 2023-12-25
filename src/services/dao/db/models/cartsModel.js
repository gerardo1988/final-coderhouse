import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = new mongoose.Schema({
    products: [
        {
           type: mongoose.SchemaTypes.ObjectId,
           ref: 'Products'
        }
    ]
});

Schema.plugin(mongoosePaginate);

export const CartsModel = mongoose.model("Carts", Schema);