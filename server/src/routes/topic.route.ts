import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireInstructor } from '../middlewares/role.middleware';

import * as TopicController from '../controllers/Topic.Controller';

const topicRouter = Router();

topicRouter.get('/courses/:courseId/topics', TopicController.listTopicsByCourse);
topicRouter.get('/topics/:id', TopicController.getTopicById);

topicRouter.post(
    '/courses/:courseId/topics',
    authMiddleware,
    requireInstructor,
    TopicController.createTopic,
);
topicRouter.put('/topics/:id', authMiddleware, requireInstructor, TopicController.updateTopic);
topicRouter.delete('/topics/:id', authMiddleware, requireInstructor, TopicController.deleteTopic);

export default topicRouter;
