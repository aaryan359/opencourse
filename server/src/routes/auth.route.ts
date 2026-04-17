import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import * as UserController from "../controllers/User.controller";


const router = Router();


router.post("/auth/register", UserController.registerUser);
router.post("/auth/login", UserController.loginUser);
router.post("/auth/logout", authMiddleware, UserController.logoutUser);
router.get("/auth/me", authMiddleware, UserController.getCurrentUser);
router.post("/auth/refresh", UserController.refreshToken);
