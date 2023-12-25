import express from 'express';
import __dirname from './utils.js';
import config from './config/config.js';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUIExpress from 'swagger-ui-express';
import passport from 'passport';
import session from 'express-session';
import handlebars from 'express-handlebars';

//import initializePassport from './config/passport.config.js';

//rutas
import cartsRoutes from './routes/cartsRoutes.js';
import productsRoutes from './routes/productsRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
//import jwtRoutes from './routes/jwtRoutes.js';
import initializePassport from './config/passport.config.js';
import emailRoutes from './routes/emailRouter.js';
import githubRoutes from './routes/gitHubRoutes.js';
import UsersExtendRouter from './routes/jwtRoutes.js';
import mockProducts from './routes/mockRoutes.js';
import loggerRoutes from './routes/loggerRoutes.js';
import viewsRoutes from './routes/viewsRoutes/views.router.js';
import paymentRoutes from './routes/paymentRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("CoderSecret"));
app.use(express.static(__dirname + 'public'));
//app.use(addLogger);

//configuracion para handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

initializePassport();
app.use(session());
app.use(passport.initialize());
app.use(passport.session());

//configuracion de swagger
const swaggerOption = {
    definition: {
        openapi: "3.0.1",
        info:{
            title:"Documentacion ecommerce",
            description: "documentacion del proyecto de coderhouse"
        }      
    },
    apis:[`./src/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOption);
app.use('/apidocs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs));

const userjwtRouter = new UsersExtendRouter();
//rutas
app.use('/', viewsRoutes);
app.use('/mockingproducts', mockProducts);
app.use('/api/products',productsRoutes);
app.use('/api/carts',cartsRoutes);
app.use('/api/users',usersRoutes);
app.use('/api/jwt',userjwtRouter.getRouter());
app.use('/api/email', emailRoutes);
app.use('/api/git', githubRoutes);
app.use('/loggerTest', loggerRoutes);
app.use('/api/payments', paymentRoutes);


const PORT = config.port;
app.listen(PORT,()=>{
    console.log("servidor corriendo en el puerto " + config.port);
})