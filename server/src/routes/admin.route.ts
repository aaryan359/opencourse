import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireAdmin } from '../middlewares/role.middleware';

import * as AdminController from '../controllers/Admin.controller';
import * as InterviewQuestionController from '../controllers/InterviewQuestion.Controller';

const adminRouter = Router();

adminRouter.post('/login', AdminController.adminLogin);

const adminGuard = [authMiddleware, requireAdmin];

// Dashboard
adminRouter.get('/dashboard', ...adminGuard, AdminController.getDashboard);

// Fields (needed by frontend to populate course creation form)
adminRouter.get('/fields', ...adminGuard, AdminController.listFields);

// User management
adminRouter.get('/users', ...adminGuard, AdminController.listUsers);
adminRouter.get('/users/:id', ...adminGuard, AdminController.getUserById);
adminRouter.patch('/users/:id/role', ...adminGuard, AdminController.changeUserRole);

// Contributor applications
adminRouter.get('/applications', ...adminGuard, AdminController.listApplications);
adminRouter.get('/applications/:id', ...adminGuard, AdminController.getApplicationById);
adminRouter.patch('/applications/:id/approve', ...adminGuard, AdminController.approveApplication);
adminRouter.patch('/applications/:id/reject', ...adminGuard, AdminController.rejectApplication);

// Video moderation
adminRouter.get('/videos', ...adminGuard, AdminController.listVideos);
adminRouter.patch('/videos/:id/approve', ...adminGuard, AdminController.approveVideo);
adminRouter.patch('/videos/:id/reject', ...adminGuard, AdminController.rejectVideo);
adminRouter.delete('/videos/:id', ...adminGuard, AdminController.deleteVideo);

// Course management (list + create — admin only)
adminRouter.get('/courses', ...adminGuard, AdminController.listCourses);
adminRouter.post('/courses', ...adminGuard, AdminController.createCourse);

// Topic management (create under a course — admin only)
adminRouter.post('/courses/:courseId/topics', ...adminGuard, AdminController.createTopic);

// Contributors
adminRouter.get('/contributors', ...adminGuard, AdminController.listContributors);

// Interview questions moderation
adminRouter.get(
    '/interview-questions/pending',
    ...adminGuard,
    InterviewQuestionController.getPendingInterviewQuestions,
);
adminRouter.get(
    '/interview-questions',
    ...adminGuard,
    InterviewQuestionController.getAllInterviewQuestions,
);
adminRouter.patch(
    '/interview-questions/:id/approve',
    ...adminGuard,
    InterviewQuestionController.approveInterviewQuestion,
);
adminRouter.patch(
    '/admin/interview-questions/:id/reject',
    ...adminGuard,
    InterviewQuestionController.rejectInterviewQuestion,
);

export default adminRouter;
