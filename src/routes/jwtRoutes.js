
import CustomRouter from "./custom/customRouter.js";
import * as JwtController from "../controllers/jwtController.js";

export default class UsersExtendRouter extends CustomRouter{
    
    init(){
        this.post("/",['PREMIUM'], JwtController.loginUser);

        this.get("/currentUser", ["PREMIUM"], (req, res) => {
            res.sendSuccess(req.user);
        });

    }
}
