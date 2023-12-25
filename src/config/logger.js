import winston, { transports } from 'winston';
import config from './config.js';

const customLevelsOptions={
    
    levels:{
        fatal: 0,
        error: 1,
        warning: 2,
        http: 3,
        info:4,
        debug: 5
    },
    colors:{
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        info: 'blue',
        debug: 'white'
    }   
};

const devLogger = winston.createLogger({
    
    levels: customLevelsOptions.levels,
    transports:[
        new winston.transports.Console({
            level:"debug",
            format: winston.format.combine(
                winston.format.colorize({
                    colors: customLevelsOptions.colors
                }),
                winston.format.simple()
            )
        }),
        new winston.transports.File(
            {
                filename:'./errors.log', 
                level:"debug",
                format: winston.format.simple()
            }
        )
    ]
});

const prodLogger = winston.createLogger({
    
    levels: customLevelsOptions.levels,
    transports:[
        new winston.transports.Console({
            level:"info",
            format: winston.format.combine(
                winston.format.colorize({
                    colors: customLevelsOptions.colors
                }),
                winston.format.simple()
            )
        }),
        new winston.transports.File(
            {
                filename:'./errors.log', 
                level:"info",
                format: winston.format.simple()
            }
        )
    ]
});

export const addLogger= (req, res, next)=>{
    
    if(config.environment === 'production'){

        req.logger= prodLogger;
        req.logger.info(`${req.method} en ${req.url} at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
        

    }else{
        req.logger= devLogger;
        req.logger.debug(`${req.method} en ${req.url} at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
           
    }
    next();
};