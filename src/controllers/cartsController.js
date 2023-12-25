//import CartsService from '../services/CartsService.js';
import { cartsService } from  '../services/factory.js';

//const cartsService = new CartsService();

export async function getCarts(req, res){
    
    try {
        let carts= await cartsService.getAll();
        res.status(200).send(carts);
        
    } catch (error) {

        console.error(error);
        res.status(500).send({error:error, message:"no se pudo obtener los carritos"});
        
    }
}

export async function saveCart(req, res){
    
    try {

        let result= await cartsService.save(req.body);
        res.status(201).send(result);
        
    } catch (error) {
        
        console.error(error);
        res.status(500).send({error:error, message:"no se pudo guardar el carrito"});
    }
}

export async function deleteCart(req, res){

    try {
        
        let _id = req.params._id;
        let result = await cartsService.delete(_id);
        res.status(200).send({message: "se elimino el carrito con id: " + _id})
    } catch (error) {
        
        console.error(error);
        res.status(500).send({error:error, message:"no se pudo eliminar el carrito"});
    }
}

export async function getOneCart(req,res){

    try {

        let _id = req.params._id;
        let result = await cartsService.getOne(_id);
        res.status(200).send(result)
        
    } catch (error) {
        console.error(error);
        res.status(500).send({error:error, message:"no encontro ningun carrito con el id: " + _id});
    }
}

export async function updateCart(req, res){

    try {
        
        let cart = req.body;
        let _id = req.params._id;
        let result = await cartsService.update(_id,cart);
        res.status(202).send(cart);
    
    } catch (error) {
        console.error(error);
        res.status(500).send({error:error, message:"no se pudo modificar el carrito"});
    }
}

