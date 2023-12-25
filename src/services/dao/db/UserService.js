import { userModel } from "./models/userModel.js";

export default class UserService {
    
    getAll = async() => {
        try {

            let users = await userModel.find();
            return users.map(user=> user.toObject());

        } catch (error) {
            
            throw new Error(error);
        }
    }

    save= async(user)=> { 
        
        try {
            
            let result = await userModel.create(user);
            return result;
        
        } catch (error) {
            
            throw new Error(error);
        }
    }

    delete = async(_id) =>{
        try {

            let deleteUser = await userModel.deleteOne({_id:_id});
            return deleteUser;
            
        } catch (error) {
            
            throw new Error(error);
        }
    }

    getOne = async(_id)=>{
        try {

            let findUser = await userModel.findById({_id:_id}).populate("cart");
            return findUser;
            
        } catch (error) {
            
            throw new Error(error);
        }
    }

    update = async(_id, user)=>{
        try {
            let userdb = await userModel.updateOne({_id:_id},user);
            return userdb;
        } catch (error) {
            throw new Error(error);
        }
    }
}

