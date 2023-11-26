import express from 'express';
import { login } from '../controllers/auth/login.js';
import { register } from '../controllers/auth/register.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

export default authRouter;