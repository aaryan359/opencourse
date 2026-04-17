import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireAdmin, requireInstructor } from "../middlewares/role.middleware";


import * as AdminController from "../controllers/Admin.controller";
import * as CourseController from "../controllers/Course.controller";

const router = Router();




router.post("/admin/login", AdminController.adminLogin);

const adminGuard = [authMiddleware, requireAdmin];


router.get("/courses", CourseController.listCourses);
router.get("/courses/:slug", CourseController.getCourseBySlug);
router.get("/fields/:fieldSlug/courses", CourseController.getCoursesByField);

router.post("/courses", authMiddleware, requireInstructor, CourseController.createCourse);
router.put("/courses/:id", authMiddleware, requireInstructor, CourseController.updateCourse);
router.delete("/courses/:id", authMiddleware, requireInstructor, CourseController.deleteCourse);
router.patch("/courses/:id/publish", authMiddleware, requireInstructor, CourseController.togglePublishCourse);

