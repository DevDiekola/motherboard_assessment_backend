import express from 'express';
import { login } from '../controllers/auth/login.js';
import { register } from '../controllers/auth/register.js';
import { logout } from '../controllers/auth/logout.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

export default authRouter;