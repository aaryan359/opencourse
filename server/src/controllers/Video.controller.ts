import type { Response } from 'express';
import type { AuthRequest } from '../middlewares/auth.middleware';
import { Video } from '../models/Video';
import { Topic } from '../models/Topic';
import { User } from '../models/User';
import ApiResponse from '../utils/ApiResponse';
import { MAX_VIDEO_DURATION_SECONDS } from '../middlewares/videoUpload.middleware';

const parseDuration = (raw: unknown): number | undefined => {
    if (raw === undefined || raw === null || raw === '') return undefined;
    const parsed = Number(raw);
    if (!Number.isFinite(parsed) || parsed <= 0) return undefined;
    return parsed;
};

const isValidHttpUrl = (value: string): boolean => {
    try {
        const parsed = new URL(value);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
        return false;
    }
};

export const listVideosByCourse = async (req: AuthRequest, res: Response) => {
    try {
        const { courseId } = req.params;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const skip = (page - 1) * limit;

        const videos = await Video.find({
            course: courseId,
            status: 'approved',
        })
            .populate('topic', 'title order')
            .populate('uploadedBy', 'username profile.avatar')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Video.countDocuments({
            course: courseId,
            status: 'approved',
        });

        return ApiResponse.success(res, {
            data: videos,
            message: 'Videos retrieved successfully',
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('List videos by course error:', error);
        return ApiResponse.error(res, {
            message: 'Failed to retrieve videos',
            statusCode: 500,
        });
    }
};

export const listVideosByTopic = async (req: AuthRequest, res: Response) => {
    try {
        const { topicId } = req.params;

        const videos = await Video.find({
            topic: topicId,
            status: 'approved',
        })
            .populate('uploadedBy', 'username profile.avatar')
            .sort({ createdAt: 1 });

        return ApiResponse.success(res, {
            data: videos,
            message: 'Videos retrieved successfully',
        });
    } catch (error) {
        console.error('List videos by topic error:', error);
        return ApiResponse.error(res, {
            message: 'Failed to retrieve videos',
            statusCode: 500,
        });
    }
};

export const getVideoById = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        const video = await Video.findOne({
            _id: id,
            status: 'approved',
        })
            .populate('topic', 'title')
            .populate('course', 'title slug')
            .populate('uploadedBy', 'username profile.avatar profile.bio');

        if (!video) {
            return ApiResponse.error(res, {
                message: 'Video not found',
                statusCode: 404,
            });
        }

        return ApiResponse.success(res, {
            data: video,
            message: 'Video retrieved successfully',
        });
    } catch (error) {
        console.error('Get video error:', error);
        return ApiResponse.error(res, {
            message: 'Failed to retrieve video',
            statusCode: 500,
        });
    }
};

export const uploadVideo = async (req: AuthRequest, res: Response) => {
    try {
        const { topicId } = req.params;
        const userId = req.user?.userId;
        const { title, description, url } = req.body;
        const file = req.file;
        const duration = parseDuration(req.body?.duration);

        if (!title) {
            return ApiResponse.error(res, {
                message: 'Title is required',
                statusCode: 400,
            });
        }

        const normalizedUrl = String(url || '').trim();
        const hasExternalUrl = Boolean(normalizedUrl);
        const hasFileUpload = Boolean(file);

        if (!hasExternalUrl && !hasFileUpload) {
            return ApiResponse.error(res, {
                message: 'Provide either a video file upload or a video URL',
                statusCode: 400,
            });
        }

        if (hasExternalUrl && hasFileUpload) {
            return ApiResponse.error(res, {
                message: 'Provide only one source: either file upload or URL',
                statusCode: 400,
            });
        }

        if (hasExternalUrl && !isValidHttpUrl(normalizedUrl)) {
            return ApiResponse.error(res, {
                message: 'Video URL must be a valid http/https link',
                statusCode: 400,
            });
        }

        if (duration && duration > MAX_VIDEO_DURATION_SECONDS) {
            return ApiResponse.error(res, {
                message: `Video is too long. Max allowed duration is ${Math.floor(
                    MAX_VIDEO_DURATION_SECONDS / 60,
                )} minutes`,
                statusCode: 400,
            });
        }

        if (hasFileUpload && !duration) {
            return ApiResponse.error(res, {
                message: 'Duration is required when uploading a video file',
                statusCode: 400,
            });
        }

        const topic = await Topic.findById(topicId);

        if (!topic) {
            return ApiResponse.error(res, {
                message: 'Topic not found',
                statusCode: 404,
            });
        }

        const resolvedUrl = hasFileUpload ? `/uploads/videos/${file?.filename}` : normalizedUrl;

        const video = await Video.create({
            title: String(title).trim(),
            description,
            url: resolvedUrl,
            sourceType: hasFileUpload ? 'file' : 'url',
            mimeType: file?.mimetype,
            fileSize: file?.size,
            duration,
            topic: topicId,
            course: topic.course,
            uploadedBy: userId,
            status: 'pending',
        });

        // Update user stats
        await User.findByIdAndUpdate(userId, {
            $inc: { 'stats.uploadedVideos': 1 },
        });

        await video.populate([
            { path: 'topic', select: 'title' },
            { path: 'course', select: 'title slug' },
        ]);

        return ApiResponse.success(res, {
            data: video,
            message: 'Video uploaded successfully and pending approval',
            statusCode: 201,
        });
    } catch (error) {
        console.error('Upload video error:', error);
        return ApiResponse.error(res, {
            message: 'Failed to upload video',
            statusCode: 500,
        });
    }
};

export const getUserVideos = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;
        const status = req.query.status as string;

        const filter: Record<string, unknown> = { uploadedBy: userId };

        if (status) {
            filter.status = status;
        }

        const videos = await Video.find(filter)
            .populate('topic', 'title')
            .populate('course', 'title slug')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Video.countDocuments(filter);

        return ApiResponse.success(res, {
            data: videos,
            message: 'Videos retrieved successfully',
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Get user videos error:', error);
        return ApiResponse.error(res, {
            message: 'Failed to retrieve videos',
            statusCode: 500,
        });
    }
};
