import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";


import * as AdminController from "../controllers/Admin.controller";
import * as InterviewQuestionController from "../controllers/InterviewQuestion.Controller";

const router = Router();




router.post("/admin/login", AdminController.adminLogin);

const adminGuard = [authMiddleware, requireAdmin];

// Dashboard
router.get("/admin/dashboard", ...adminGuard, AdminController.getDashboard);

// Fields (needed by frontend to populate course creation form)
router.get("/admin/fields", ...adminGuard, AdminController.listFields);

// User management
router.get("/admin/users", ...adminGuard, AdminController.listUsers);
router.get("/admin/users/:id", ...adminGuard, AdminController.getUserById);
router.patch("/admin/users/:id/role", ...adminGuard, AdminController.changeUserRole);

// Contributor applications
router.get("/admin/applications", ...adminGuard, AdminController.listApplications);
router.get("/admin/applications/:id", ...adminGuard, AdminController.getApplicationById);
router.patch("/admin/applications/:id/approve", ...adminGuard, AdminController.approveApplication);
router.patch("/admin/applications/:id/reject", ...adminGuard, AdminController.rejectApplication);

// Video moderation
router.get("/admin/videos", ...adminGuard, AdminController.listVideos);
router.patch("/admin/videos/:id/approve", ...adminGuard, AdminController.approveVideo);
router.patch("/admin/videos/:id/reject", ...adminGuard, AdminController.rejectVideo);
router.delete("/admin/videos/:id", ...adminGuard, AdminController.deleteVideo);

// Course management (list + create — admin only)
router.get("/admin/courses", ...adminGuard, AdminController.listCourses);
router.post("/admin/courses", ...adminGuard, AdminController.createCourse);


// Topic management (create under a course — admin only)
router.post("/admin/courses/:courseId/topics", ...adminGuard, AdminController.createTopic);

// Contributors
router.get("/admin/contributors", ...adminGuard, AdminController.listContributors);

// Interview questions moderation
router.get("/admin/interview-questions/pending", ...adminGuard, InterviewQuestionController.getPendingInterviewQuestions);
router.get("/admin/interview-questions", ...adminGuard, InterviewQuestionController.getAllInterviewQuestions);
router.patch("/admin/interview-questions/:id/approve", ...adminGuard, InterviewQuestionController.approveInterviewQuestion);
router.patch("/admin/interview-questions/:id/reject", ...adminGuard, InterviewQuestionController.rejectInterviewQuestion);

