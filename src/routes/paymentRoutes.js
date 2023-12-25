import { Router } from "express";
import { payment } from "../controllers/paymentController.js";

const router = Router();

router.post('/payment-intent', payment);

export default router;