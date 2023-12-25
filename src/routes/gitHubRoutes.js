import { Router } from 'express';
import passport from 'passport';
import { githubLogin, callback } from '../controllers/gitHubController.js';

const router = Router();

router.get('/github', passport.authenticate('github',{scope:['user: email']}), githubLogin);

router.get('/githubcallback', passport.authenticate('github',{failureRedirect:'/github/error'}), callback);

export default router;