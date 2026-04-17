import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireInstructor } from "../middlewares/role.middleware";
import * as InterviewQuestionController from "../controllers/InterviewQuestion.Controller";

const interviewRouter = Router();

interviewRouter.post("/submit", authMiddleware, requireInstructor, InterviewQuestionController.submitInterviewQuestions);

interviewRouter.get("/getquestions", InterviewQuestionController.getAllInterviewQuestions);


export default interviewRouter;