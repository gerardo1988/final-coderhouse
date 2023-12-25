import { Router } from "express";
import * as ProductsController from "../controllers/productsController.js";

const router = Router();

router.get("/", ProductsController.getProducts);
router.post("/save", ProductsController.saveProduct);
router.get("/:_id", ProductsController.getOneProduct);
router.delete("/delete/:_id", ProductsController.deleteProduct);
router.put("/update/:_id", ProductsController.updateProduct);


export default router;