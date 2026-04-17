import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import * as UserController from "../controllers/User.controller";


const router = Router();

router.get("/users/me/stats", authMiddleware, UserController.getUserStats);
router.get("/users/me/uploads", authMiddleware, UserController.getUserUploads);
router.put("/users/me", authMiddleware, UserController.updateProfile);
router.put("/users/me/password", authMiddleware, UserController.changePassword);
router.get("/users/:id", UserController.getUserProfile);