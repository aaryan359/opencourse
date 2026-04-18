import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireInstructor } from '../middlewares/role.middleware';
import { requireAdmin } from '../middlewares/role.middleware';
import * as InterviewQuestionController from '../controllers/InterviewQuestion.Controller';

const interviewRouter = Router();

interviewRouter.post(
    '/submit',
    authMiddleware,
    requireInstructor,
    InterviewQuestionController.submitInterviewQuestions,
);

interviewRouter.get('/', InterviewQuestionController.listInterviewQuestions);
// Admin-only moderation list (includes pending/rejected)
interviewRouter.get(
    '/getquestions',
    authMiddleware,
    requireAdmin,
    InterviewQuestionController.getAllInterviewQuestions,
);
interviewRouter.get('/companies', InterviewQuestionController.getCompanies);
interviewRouter.get('/roles', InterviewQuestionController.getRoles);
interviewRouter.get('/getquestions/:id', InterviewQuestionController.getInterviewQuestionById);

export default interviewRouter;
