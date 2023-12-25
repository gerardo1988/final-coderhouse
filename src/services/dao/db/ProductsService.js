import { ProductsModel } from '../db/models/productsModel.js';

export default class ProductsService {
    
    getAll = async() => {
        try {

            let products = await ProductsModel.find();
            return products.map(product=> product.toObject());

        } catch (error) {
            
            throw new Error(error);
        }
    }

    save= async(product)=> { 
        
        try {
            
            let result = await ProductsModel.create(product);
            return result;
        
        } catch (error) {
            
            throw new Error(error);
        }
    }

    delete = async(_id) =>{
        try {

            let deleteProduct = await ProductsModel.deleteOne({_id:_id});

            return deleteProduct;
            
        } catch (error) {
            
            throw new Error(error);
        }
    }

    getOne = async(_id)=>{
        try {

            let findProduct = await ProductsModel.findById({_id:_id});
            return findProduct;
            
        } catch (error) {
            
            throw new Error(error);
        }
    }

    update = async(_id, product)=>{
        try {
            let productdb = await ProductsModel.updateOne({_id:_id},product);
            return productdb;
        } catch (error) {
            throw new Error(error);
        }
    }
}


