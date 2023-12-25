import { fileURLToPath } from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { faker } from '@faker-js/faker';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//metodos para hashear la contraeña y validar si la misma es igual a la que pasa el usuario
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isvalidPassword = (user, password) =>{
    console.log(`Datos a validar: user-password: ${user.password}, password: ${password}`);
    return bcrypt.compareSync(password, user.password);
}

export const PRIVATE_KEY= "MiClaveSercretaDeCoderhouse";

//metodo para generar el token
export const generateJWToken= (user) =>{
    return jwt.sign({user}, PRIVATE_KEY, {expiresIn: '60s'});
};

// Metodo que autentica el token JWT
export const authToken = (req, res, next)=>{

    const authHeader = req.headers.authorization;
    console.log("Token present in header auth: " + authHeader);

    if(!authHeader){
        return res.status(401).send({error: "usuario no autenticado o token perdido"});
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, PRIVATE_KEY, (error, credentials)=>{
        
        if (error){
            return res.status(403).send({error: "token invalido, no autorizado"});
        }

        req.user = credentials.user;
        console.log(req.user);
        next();
    })

}

//todo para hacer los mock
faker.locale = 'es';
export const generateProduct = () =>{

    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        stock: faker.random.numeric(1),
        id: faker.database.mongodbObjectId(),
        image: faker.image.image()
    }
    
}


export default __dirname;