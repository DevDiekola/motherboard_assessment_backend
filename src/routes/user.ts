import express from 'express';
import { authenticateToken } from '../middlewares/authenticate_token.js';
import { getUser } from '../controllers/user/get_user.js';

const userRouter = express.Router();

userRouter.get('/', authenticateToken, getUser);

export default userRouter;