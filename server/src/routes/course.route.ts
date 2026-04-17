import { Router } from 'express';
import * as CourseController from '../controllers/Course.controller';

const courseRouter = Router();

courseRouter.get('/getcourses', CourseController.listCourses);
courseRouter.get('/getfields', CourseController.listFields);

export default courseRouter;
