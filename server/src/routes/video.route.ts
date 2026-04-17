import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireAdmin, requireInstructor } from "../middlewares/role.middleware";


import * as AdminController from "../controllers/Admin.controller";
import * as VideoController from "../controllers/Video.controller";


const router = Router();


router.post("/admin/login", AdminController.adminLogin);

const adminGuard = [authMiddleware, requireAdmin];



router.get("/courses/:courseId/videos", VideoController.listVideosByCourse);
router.get("/topics/:topicId/videos", VideoController.listVideosByTopic);
router.get("/videos/:id", VideoController.getVideoById);


// Only approved contributors can upload
router.post("/topics/:topicId/videos", authMiddleware, requireInstructor, VideoController.uploadVideo);
router.get("/users/me/videos", authMiddleware, VideoController.getUserVideos);

