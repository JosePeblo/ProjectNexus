import express from 'express';
import { loginPage, signupPage, login, signup, verification } from '../controllers/auth.controller';

const router = express.Router();

router.get('/login', loginPage);
router.post('/login', login);
router.get('/signup', signupPage);
router.post('/signup', signup);
router.post('/verify', verification);

export default router;