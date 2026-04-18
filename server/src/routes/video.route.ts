import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireInstructor } from '../middlewares/role.middleware';
import { uploadVideoFile } from '../middlewares/videoUpload.middleware';

import * as VideoController from '../controllers/Video.controller';

const videoRouter = Router();

videoRouter.get('/courses/:courseId/videos', VideoController.listVideosByCourse);
videoRouter.get('/topics/:topicId/videos', VideoController.listVideosByTopic);
videoRouter.get('/videos/:id', VideoController.getVideoById);

// Only approved contributors can upload
videoRouter.post(
    '/topics/:topicId/videos',
    authMiddleware,
    requireInstructor,
    uploadVideoFile,
    VideoController.uploadVideo,
);

videoRouter.get(
    '/users/me/videos',
    authMiddleware,
    requireInstructor,
    VideoController.getUserVideos,
);

export default videoRouter;
