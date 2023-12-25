import passport from 'passport';
import { userModel } from '../services/dao/db/models/userModel.js';
import jwtStrategy from 'passport-jwt';
import GitHubStrategy from 'passport-github2';
import { PRIVATE_KEY } from '../utils.js';
import { usersService } from '../services/factory.js';

const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

const initializePassport = () =>{

    /** Estrategia con Github */
    passport.use('github', new GitHubStrategy(

        {
            clientID: 'Iv1.28f12870921382d3',
            clientSecret: 'bbac77f5f0733d45c1df5fb55c740c52d061c8b6',
            callbackUrl:'http://localhost:9090/api/git/githubcallback'
        },

        async(accessToken, refreshToken, profile,done)=>{
            
            console.log("Profile obtenido del usuario: " + profile);

            try {
                
                const user = await userModel.findOne({email: profile._json.email});
                console.log("Usuario encontrado para login por github: " + user);

                if (!user) {
                    
                    console.warn("no existe el usuario con el username: " + profile._json.email);

                    let newUser = {
                        first_name: profile._json.name,
                        last_name: '',
                        email: profile._json.email,
                        age: '',
                        password: '',
                        loggedBy: 'GitHub',
                        role: 'user'
                    }
                    const result= usersService.save(newUser);
                    done(null, result);
                
                }else{
                    return done(null, user);
                }

            } catch (error) {
                return done(error);
            }
        }

    ));

    /** Estrategia con jwt */
    passport.use('jwt', new JwtStrategy(

        //extraigo la cookie
        {
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey: PRIVATE_KEY
        },

        async(jwt_payload, done)=>{
            
            console.log("dentro de passport Strategy con JWT.");

            try {
                console.log("payload "+ jwt_payload);
                return done(null, jwt_payload.user);
            } catch (error) {
                console.error(error);
                return done(error);
            }
        }

    ));

    //serializacion y deserializacion
    passport.serializeUser((user,done)=>{
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done)=>{

        try {

            let user = await userModel.findById(id);
            done(null, user);

        } catch (error) {
            
            console.error("Error deserializando el usuario: " + error);
        }
    })
};

const cookieExtractor = req =>{
    
    let token = null;
    
    console.log("En cookie extractor: ");
    
    if(req && req.cookies){
        console.log("cookies presentes: " + req.cookies);
        token = req.cookies['jwtCookieToken'];
        console.log("Token obtenido desde Cookie: "+ token);
    }
    return token;

}

export default initializePassport;