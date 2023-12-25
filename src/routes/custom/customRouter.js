import { Router } from "express";
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from "../../utils.js";
import { callback } from "../../controllers/gitHubController.js";

export default class CustomRouter{

    constructor(){
        this.router = Router();
        this.init();
    }

    getRouter(){
        return this.router;
    }

    init(){}

    handlePolicies = policies => (req, res, next)=>{

        console.log("politicas a evaluar: " + policies);
        if(policies[0]== "PREMIUM"){
            return next();
        }

        const authHeader = req.headers.authorization;
        console.log("Token present in header auth: "+ authHeader);

        if(!authHeader){
            return res.status(401).send({error:"usuario no autenticado o token perdio"})
        }
        const token= authHeader.split(' ')[1];

        jwt.verify(token, PRIVATE_KEY, (error, credentials)=>{
            if (error) {
                return res.status(403).send({error:"Token invalido, no tiene autorización"})
            }
            const user = credentials.user;

            if(!policies.includes(user.role.toUpperCase())){
                return res.status(403).send({error: "el usuario no tiene privilegios, revisa tus roles!"});
            }

            req.user = user;
            console.log(req.user);
            next();
        })
    }


    get(path,policies, ...callbacks){
        this.router.get(
            path,
            this.handlePolicies(policies),
            this.generateCustomResponses, 
            this.applyCallbacks(callbacks))
    }

    post(path,policies, ...callbacks){
        this.router.post(
            path,
            this.handlePolicies(policies),
            this.generateCustomResponses, 
            this.applyCallbacks(callbacks))
    }

    generateCustomResponses = (req, res, next)=>{
        res.sendSuccess = payload => res.status(200).send({status: "Success", payload});
        res.sendInternalServerError = error => res.status(500).send({status: "Error", error});
        res.sendClientError = error => res.status(400).send({status: "Client Error, Bad request from client", error});
        res.sendUnauthorizedError = error => res.status(401).send({error: "usuario no autenticado o token invalido"});
        res.sendForbiddenError = error => res.status(403).send({error: "token invalido o usuario sin acceso"});
        next();
    }

    applyCallbacks(callbacks){
        
        return callbacks.map((callback)=> async (...params) =>{
            try {
                await callback.apply(this, params)
            } catch (error) {
                console.log(error);
                params[1].status(500).send(error);
            }
        })
    }
}