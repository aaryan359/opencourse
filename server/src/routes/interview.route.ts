import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireInstructor } from '../middlewares/role.middleware';
import * as InterviewQuestionController from '../controllers/InterviewQuestion.Controller';

const interviewRouter = Router();

interviewRouter.post(
    '/submit',
    authMiddleware,
    requireInstructor,
    InterviewQuestionController.submitInterviewQuestions,
);

interviewRouter.get('/', InterviewQuestionController.listInterviewQuestions);
interviewRouter.get('/getquestions', InterviewQuestionController.getAllInterviewQuestions);
interviewRouter.get('/companies', InterviewQuestionController.getCompanies);
interviewRouter.get('/roles', InterviewQuestionController.getRoles);
interviewRouter.get('/getquestions/:id', InterviewQuestionController.getInterviewQuestionById);

export default interviewRouter;
