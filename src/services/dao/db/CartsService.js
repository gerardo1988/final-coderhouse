import { CartsModel } from "../db/models/cartsModel.js";

export default class CartsService{
   
    getAll = async () =>{
        try {

            let carts = await CartsModel.find();
            return carts.map(cart=> cart.toObject());
        
        } catch (error) {

            throw new Error(error);
            
        }       
    }

    save = async (cart) =>{
        try {

            let result = await CartsModel.create(cart);
            return result;
        
        } catch (error) {

            throw new Error(error);
            
        }       
    }

    delete = async(_id) =>{
        try {

            let deleteCart = await CartsModel.deleteOne({_id:_id});
            return deleteCart;
            
        } catch (error) {
            
            throw new Error(error);
        }
    }

    getOne = async(_id)=>{
        try {

            let findCart = await CartsModel.findById({_id:_id}).populate("products");
            return findCart;
            
        } catch (error) {
            
            throw new Error(error);
        }
    }

    update = async(_id, cart)=>{
        try {
            let cartdb = await CartsModel.updateOne({_id:_id},cart);
            return cartdb;
        } catch (error) {
            throw new Error(error);
        }
    }


}