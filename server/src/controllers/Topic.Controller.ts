import type { Response } from 'express';
import type { AuthRequest } from '../middlewares/auth.middleware';
import { Topic } from '../models/Topic';
import { Course } from '../models/Course';
import ApiResponse from '../utils/ApiResponse';

export const listTopicsByCourse = async (req: AuthRequest, res: Response) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);

        if (!course) {
            return ApiResponse.error(res, {
                message: 'Course not found',
                statusCode: 404,
            });
        }

        const topics = await Topic.find({ course: courseId })
            .sort({ order: 1 })
            .populate('course', 'title slug');

        return ApiResponse.success(res, {
            data: topics,
            message: 'Topics retrieved successfully',
        });
    } catch (error) {
        console.error('List topics error:', error);
        return ApiResponse.error(res, {
            message: 'Failed to retrieve topics',
            statusCode: 500,
        });
    }
};

export const getTopicById = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        const topic = await Topic.findById(id).populate('course', 'title slug');

        if (!topic) {
            return ApiResponse.error(res, {
                message: 'Topic not found',
                statusCode: 404,
            });
        }

        return ApiResponse.success(res, {
            data: topic,
            message: 'Topic retrieved successfully',
        });
    } catch (error) {
        console.error('Get topic error:', error);
        return ApiResponse.error(res, {
            message: 'Failed to retrieve topic',
            statusCode: 500,
        });
    }
};

export const createTopic = async (req: AuthRequest, res: Response) => {
    try {
        const { courseId } = req.params;
        const { title, order } = req.body;

        if (!title) {
            return ApiResponse.error(res, {
                message: 'Title is required',
                statusCode: 400,
            });
        }

        const course = await Course.findById(courseId);

        if (!course) {
            return ApiResponse.error(res, {
                message: 'Course not found',
                statusCode: 404,
            });
        }

        const topic = await Topic.create({
            title,
            course: courseId,
            order: order || 0,
        });

        await topic.populate('course', 'title slug');

        return ApiResponse.success(res, {
            data: topic,
            message: 'Topic created successfully',
            statusCode: 201,
        });
    } catch (error) {
        console.error('Create topic error:', error);
        return ApiResponse.error(res, {
            message: 'Failed to create topic',
            statusCode: 500,
        });
    }
};

export const updateTopic = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { title, order } = req.body;

        const topic = await Topic.findByIdAndUpdate(
            id,
            { title, order },
            { new: true, runValidators: true },
        ).populate('course', 'title slug');

        if (!topic) {
            return ApiResponse.error(res, {
                message: 'Topic not found',
                statusCode: 404,
            });
        }

        return ApiResponse.success(res, {
            data: topic,
            message: 'Topic updated successfully',
        });
    } catch (error) {
        console.error('Update topic error:', error);
        return ApiResponse.error(res, {
            message: 'Failed to update topic',
            statusCode: 500,
        });
    }
};

export const deleteTopic = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        const topic = await Topic.findByIdAndDelete(id);

        if (!topic) {
            return ApiResponse.error(res, {
                message: 'Topic not found',
                statusCode: 404,
            });
        }

        return ApiResponse.success(res, {
            message: 'Topic deleted successfully',
        });
    } catch (error) {
        console.error('Delete topic error:', error);
        return ApiResponse.error(res, {
            message: 'Failed to delete topic',
            statusCode: 500,
        });
    }
};
