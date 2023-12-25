import { Router } from "express";
import { addLogger } from "../config/logger.js";

const router = Router();

router.get("/", addLogger);

export default router;