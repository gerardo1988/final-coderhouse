import mongoose from 'mongoose';
import config from './config.js';

export default class MongoSingleton {
    static #instance

    constructor() {
        this.#connectMongoDB()
    }

    static getIntance() {
        if (this.#instance) {
            console.log("Ya se ha abierto una conxion a MongoDB");
        } else {
            this.#instance = new MongoSingleton()
        }
        return this.#instance;
    }

    #connectMongoDB = async () => {
        try {
            await mongoose.connect('mongodb://127.0.0.1:27017/segunda-entrega?retryWrites=true&w=majority', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                w:1
            })
            console.log("Conectado con exito a la DB");
        } catch (error) {
            console.error("No se pudo conectar a la BD usando Moongose: " + error);
            console.log("url: " + config.mongoUrl)
            process.exit();
        }
    }
}