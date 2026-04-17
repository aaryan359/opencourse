import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import * as UserController from '../controllers/User.controller';

const authRouter = Router();

authRouter.post('/register', UserController.registerUser);
authRouter.post('/login', UserController.loginUser);
authRouter.post('/logout', authMiddleware, UserController.logoutUser);
authRouter.get('/me', authMiddleware, UserController.getCurrentUser);
authRouter.post('/refresh', UserController.refreshToken);

export default authRouter;
