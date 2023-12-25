//import ProductsService from '../services/ProductsService.js';
import { productsService } from  '../services/factory.js';
import Customerror from '../errors/CustomError.js';
import EErrors from '../errors/errorsEnum.js';
import { getproductsErroInfo, createproductsErroInfo, 
    deleteproductErroInfo, getOneProductErroInfo } from '../errors/messages/productsError.js';

export async function getProducts(req, res){
     
    try {
        let products= await productsService.getAll();
        if(!products){
            Customerror.createError({
                name: "Get products error",
                cause: getproductsErroInfo("lista de productos"),
                message: "error al traer los productos",
                code: EErrors.DATABASE_ERROR
            })
        }
        res.status(200).send(products);
        
    } catch (error) {

        console.error(error);
        res.status(500).send({error:error.code, message:error.message});
        
    }
}

export async function saveProduct(req, res){
    
    try {

        const { title, description, price, code, stock }= req.body;

        if(!title || !description || !price || !code || !stock){
            Customerror.createError({
                name: "Create product error",
                cause: createproductsErroInfo({title, description, price, code, stock}),
                message: "error al crear un producto",
                code: EErrors.INVALID_TYPES_ERROR
            });
        }

        const objProduct = {
            title, 
            description, 
            price, 
            code, 
            stock
        }

        let result= await productsService.save(objProduct);

        res.status(201).send(result);
        
    } catch (error) {
        
        console.error(error);
        res.status(500).send({error:error.code, message: error.message});
    }
}

export async function deleteProduct(req, res){

    try {

        let _id = req.params._id;
        let productById = await productsService.getOne(_id);
        
        if(!productById){
                Customerror.createError({
                    name: "Delete product error",
                    cause: deleteproductErroInfo(_id),
                    message: "error al tratar de eliminar un producto",
                    code: EErrors.INVALID_TYPES_ERROR
                });
            }
        
        let result = await productsService.delete(_id);
        res.status(200).send({message: "se elimino el producto con id: " + _id})
    } catch (error) {
        
        console.error(error);
        res.status(500).send({error:error.code, message: error.message});
    }
}

export async function getOneProduct(req,res){

    try {

        let _id = req.params._id;
        let result = await productsService.getOne(_id);

        if(!result){
            Customerror.createError({
                name: "get producto by Id error",
                cause: getOneProductErroInfo(_id),
                message: "error al tratar de traer un producto",
                code: EErrors.INVALID_TYPES_ERROR
            });
        }

        res.status(200).send(result)
        
    } catch (error) {
        console.error(error);
        res.status(500).send({error:error.code, message: error.message});
    }
  
}

export async function updateProduct(req, res){

    try {
        
        let product = req.body;
        let _id = req.params._id;
        let result = await productsService.update(_id,product);
        res.status(202).send(product);
    
    } catch (error) {
        console.error(error);
        res.status(500).send({error:error, message:"no se pudo modificar el producto"});
    }
}