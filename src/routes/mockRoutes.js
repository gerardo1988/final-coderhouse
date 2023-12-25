import { Router } from "express";
import { getProductsMock } from "../controllers/mockController.js";

const router = Router();

router.get("/", getProductsMock);

export default router;
