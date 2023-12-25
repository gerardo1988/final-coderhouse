import { usersService } from "../services/factory.js";
import { createHash,isvalidPassword } from "../utils.js";

//const productsService = new ProductsService();

export async function getUsers(req, res){
     
    try {
        let users= await usersService.getAll();
        res.status(200).send(users);
        
    } catch (error) {

        console.error(error);
        res.status(500).send({error:error, message:"no se pudo obtener los los usuarios"});
        
    }
}

export async function saveUser(req, res){

    //traigo los datos del body y los guardo en un objeto
    const {first_name,last_name,email,age,password, loggedBy,role,cart }= req.body;
    
    try {

        const user={
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            loggedBy,
            role,
            cart
        }
   
        let result= await usersService.save(user);
        res.status(201).send({result:result, message: "usuario creado con exito"});
        
    } catch (error) {
        
        console.error(error);
        res.status(500).send({error:error, message:"no se pudo crear el usuario"});
    }
}

export async function deleteUser(req, res){

    try {
        
        let _id = req.params._id;
        let result = await usersService.delete(_id);
        res.status(200).send({message: "se elimino el usuario con id: " + _id})
    } catch (error) {
        
        console.error(error);
        res.status(500).send({error:error, message:"no se pudo eliminar el usuario"});
    }
}

export async function getOneUser(req,res){

    try {

        let _id = req.params._id;
        let result = await usersService.getOne(_id);
        res.status(200).send(result)
        
    } catch (error) {
        console.error(error);
        res.status(500).send({error:error, message:"no encontro ningun usuario con el id: " + _id});
    }

}

export async function updateUser(req, res){

    try {
        
        let user = req.body;
        let _id = req.params._id;
        let result = await usersService.update(_id,user);
        res.status(202).send(user);
    
    } catch (error) {
        console.error(error);
        res.status(500).send({error:error, message:"no se pudo modificar el usuario"});
    }
}