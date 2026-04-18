import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import * as UserController from '../controllers/User.controller';

const userRouter = Router();

userRouter.get('/users/me/stats', authMiddleware, UserController.getUserStats);
userRouter.get('/users/me/uploads', authMiddleware, UserController.getUserUploads);
userRouter.get(
    '/contributor-application/me',
    authMiddleware,
    UserController.getMyContributorApplication,
);
userRouter.post('/contributor-application', authMiddleware, UserController.applyForContributor);
userRouter.put('/users/me', authMiddleware, UserController.updateProfile);
userRouter.put('/users/me/password', authMiddleware, UserController.changePassword);
userRouter.get('/users/:id', UserController.getUserProfile);

export default userRouter;
