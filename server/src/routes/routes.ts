import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";



import * as UserController from "../controllers/User.controller";
import * as CourseController from "../controllers/Course.controller"
import * as AdminUserController from "../controllers/AdminUser.Controller";
import * as FieldController from "../controllers/Field.Controller";
import * as TopicController from "../controllers/Topic.Controller";
import * as VideoController from "../controllers/Video.controller";
import * as AdminVideoController from "../controllers/AdminVideo.Controller";
import * as EnrollmentController from "../controllers/Enrollment.Controller";
import * as SearchController from "../controllers/Search.Controller";
import * as AdminDashboardController from "../controllers/AdminDashboard.Controller";
import * as InterviewQuestionController from "../controllers/InterviewQuestion.Controller";
import { requireAdmin, requireInstructor } from "../middlewares/role.middleware";


const router = Router();




router.post("/auth/register", UserController.registerUser);
router.post("/auth/login", UserController.loginUser);
router.post("/auth/logout", authMiddleware, UserController.logoutUser);
router.get("/auth/me", authMiddleware, UserController.getCurrentUser);
router.post("/auth/refresh", UserController.refreshToken);







router.get("/users/:id", UserController.getUserProfile);
router.put("/users/me", authMiddleware, UserController.updateProfile);
router.put("/users/me/password", authMiddleware, UserController.changePassword);
router.get("/users/me/stats", authMiddleware, UserController.getUserStats);
router.get("/users/me/uploads", authMiddleware, UserController.getUserUploads);






router.get("/admin/users", authMiddleware, requireAdmin, AdminUserController.listUsers);
router.put("/admin/users/:id/role", authMiddleware, requireAdmin, AdminUserController.changeUserRole);
router.post("/admin/users/:id/ban", authMiddleware, requireAdmin, AdminUserController.banUser);





// Public
router.get("/fields", FieldController.listFields);
router.get("/fields/:slug", FieldController.getFieldBySlug);

// Admin
router.post("/fields", authMiddleware, requireAdmin, FieldController.createField);
router.put("/fields/:id", authMiddleware, requireAdmin, FieldController.updateField);
router.delete("/fields/:id", authMiddleware, requireAdmin, FieldController.deleteField);






// Public
router.get("/courses", CourseController.listCourses);
router.get("/courses/:slug", CourseController.getCourseBySlug);
router.get("/fields/:fieldSlug/courses", CourseController.getCoursesByField);




// Admin/Instructor
router.post("/courses", authMiddleware, requireInstructor, CourseController.createCourse);
router.put("/courses/:id", authMiddleware, requireInstructor, CourseController.updateCourse);
router.delete("/courses/:id", authMiddleware, requireInstructor, CourseController.deleteCourse);
router.patch("/courses/:id/publish", authMiddleware, requireInstructor, CourseController.togglePublishCourse);

// User
router.post("/courses/:id/enroll", authMiddleware, EnrollmentController.enrollInCourse);
router.get("/courses/:courseId/progress", authMiddleware, EnrollmentController.getCourseProgress);


// Public
router.get("/courses/:courseId/topics", TopicController.listTopicsByCourse);
router.get("/topics/:id", TopicController.getTopicById);

// Admin/Instructor
router.post("/courses/:courseId/topics", authMiddleware, requireInstructor, TopicController.createTopic);
router.put("/topics/:id", authMiddleware, requireInstructor, TopicController.updateTopic);
router.delete("/topics/:id", authMiddleware, requireInstructor, TopicController.deleteTopic);
router.patch("/topics/reorder", authMiddleware, requireInstructor, TopicController.reorderTopics);


// Public
router.get("/courses/:courseId/videos", VideoController.listVideosByCourse);
router.get("/topics/:topicId/videos", VideoController.listVideosByTopic);
router.get("/videos/:id", VideoController.getVideoById);

// Authenticated users
router.post("/topics/:topicId/videos", authMiddleware, VideoController.uploadVideo);
router.get("/users/me/videos", authMiddleware, VideoController.getUserVideos);

// Admin
router.get("/admin/videos/pending", authMiddleware, requireAdmin, AdminVideoController.getPendingVideos);
router.patch("/admin/videos/:id/approve", authMiddleware, requireAdmin, AdminVideoController.approveVideo);
router.patch("/admin/videos/:id/reject", authMiddleware, requireAdmin, AdminVideoController.rejectVideo);
router.delete("/admin/videos/:id", authMiddleware, requireAdmin, AdminVideoController.deleteVideo);


router.get("/users/me/enrollments", authMiddleware, EnrollmentController.getUserEnrollments);
router.get("/enrollments/:courseId", authMiddleware, EnrollmentController.getCourseProgress);
router.patch("/enrollments/:courseId/progress", authMiddleware, EnrollmentController.updateCourseProgress);


router.get("/search", SearchController.globalSearch);
router.get("/search/courses", SearchController.searchCourses);
router.get("/search/videos", SearchController.searchVideos);
router.get("/trending", SearchController.getTrending);


router.get("/admin/stats", authMiddleware, requireAdmin, AdminDashboardController.getAdminStats);
router.get("/admin/courses", authMiddleware, requireAdmin, AdminDashboardController.getAdminCourses);
router.get("/admin/videos", authMiddleware, requireAdmin, AdminDashboardController.getAdminVideos);
router.get("/admin/enrollments", authMiddleware, requireAdmin, AdminDashboardController.getEnrollmentStats);


// ==================== INTERVIEW QUESTIONS ====================
// Public
router.get("/interview-questions", InterviewQuestionController.listInterviewQuestions);
router.get("/interview-questions/companies", InterviewQuestionController.getCompanies);
router.get("/interview-questions/roles", InterviewQuestionController.getRoles);
router.get("/interview-questions/:id", InterviewQuestionController.getInterviewQuestionById);

// Submit (public, but attaches userId if authenticated)
router.post("/interview-questions", InterviewQuestionController.submitInterviewQuestions);

// Admin
router.get("/admin/interview-questions/pending", authMiddleware, requireAdmin, InterviewQuestionController.getPendingInterviewQuestions);
router.patch("/admin/interview-questions/:id/approve", authMiddleware, requireAdmin, InterviewQuestionController.approveInterviewQuestion);
router.patch("/admin/interview-questions/:id/reject", authMiddleware, requireAdmin, InterviewQuestionController.rejectInterviewQuestion);


export default router;