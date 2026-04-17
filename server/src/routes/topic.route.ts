
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireAdmin, requireInstructor } from "../middlewares/role.middleware";


import * as AdminController from "../controllers/Admin.controller";
import * as TopicController from "../controllers/Topic.Controller";


const router = Router();




router.post("/admin/login", AdminController.adminLogin);

const adminGuard = [authMiddleware, requireAdmin];


router.get("/courses/:courseId/topics", TopicController.listTopicsByCourse);
router.get("/topics/:id", TopicController.getTopicById);

router.post("/courses/:courseId/topics", authMiddleware, requireInstructor, TopicController.createTopic);
router.put("/topics/:id", authMiddleware, requireInstructor, TopicController.updateTopic);
router.delete("/topics/:id", authMiddleware, requireInstructor, TopicController.deleteTopic);
