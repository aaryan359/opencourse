import { Router } from "express";

import * as InterviewQuestionController from "../controllers/InterviewQuestion.Controller";

const router = Router();

router.post("/interview-questions", InterviewQuestionController.submitInterviewQuestions);