import { Router } from "express";
import * as UsersController from "../controllers/usersController.js";
import { logout } from "../controllers/jwtController.js";

const router = Router();

router.get("/logoutuser",logout);
router.get("/get", UsersController.getUsers);
router.post("/save", UsersController.saveUser);
router.delete("/:_id", UsersController.deleteUser);
router.get("/:_id", UsersController.getOneUser);
router.put("/update/:_id", UsersController.updateUser);


export default router;