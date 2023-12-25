import { Router}  from 'express';
import { sendEmail } from '../controllers/emailController.js';

const router = Router();

router.get("/", sendEmail);

export default router;