import type { Response } from 'express';
import type { AuthRequest } from '../middlewares/auth.middleware';
import { Course } from '../models/Course';
import { Field } from '../models/Field';
import ApiResponse from '../utils/ApiResponse';

export const listFields = async (req: AuthRequest, res: Response) => {
    try {
        const fields = await Field.find().sort({ name: 1 });
        return ApiResponse.success(res, { data: fields });
    } catch (error) {
        console.error('List fields error:', error);
        return ApiResponse.error(res, {
            message: 'Failed to retrieve fields',
            statusCode: 500,
        });
    }
};

export const listCourses = async (req: AuthRequest, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 12;
        const skip = (page - 1) * limit;
        const level = req.query.level as string;
        const fieldId = req.query.field as string;

        const filter: Record<string, unknown> = { isPublished: true };

        if (level) {
            filter.level = level;
        }

        if (fieldId) {
            filter.field = fieldId;
        }

        const courses = await Course.find(filter)
            .populate('field', 'name slug')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Course.countDocuments(filter);

        return ApiResponse.success(res, {
            data: courses,
            message: 'Courses retrieved successfully',
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('List courses error:', error);
        return ApiResponse.error(res, {
            message: 'Failed to retrieve courses',
            statusCode: 500,
        });
    }
};

export const getCoursesByField = async (req: AuthRequest, res: Response) => {
    try {
        const { fieldSlug } = req.params;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 12;
        const skip = (page - 1) * limit;

        const courses = await Course.find({ isPublished: true })
            .populate({
                path: 'field',
                match: { slug: fieldSlug },
            })
            .skip(skip)
            .limit(limit);

        // Filter out courses where field didn't match
        const filteredCourses = courses.filter((course) => course.field);

        return ApiResponse.success(res, {
            data: filteredCourses,
            message: 'Courses retrieved successfully',
        });
    } catch (error) {
        console.error('Get courses by field error:', error);
        return ApiResponse.error(res, {
            message: 'Failed to retrieve courses',
            statusCode: 500,
        });
    }
};

export const createCourse = async (req: AuthRequest, res: Response) => {
    try {
        const { title, slug, description, field, level, thumbnail } = req.body;

        if (!title || !slug || !description || !field) {
            return ApiResponse.error(res, {
                message: 'Title, slug, description, and field are required',
                statusCode: 400,
            });
        }

        const existingCourse = await Course.findOne({ slug });

        if (existingCourse) {
            return ApiResponse.error(res, {
                message: 'Course with this slug already exists',
                statusCode: 409,
            });
        }

        const course = await Course.create({
            title,
            slug,
            description,
            field,
            level,
            thumbnail,
        });

        await course.populate('field', 'name slug');

        return ApiResponse.success(res, {
            data: course,
            message: 'Course created successfully',
            statusCode: 201,
        });
    } catch (error) {
        console.error('Create course error:', error);
        return ApiResponse.error(res, {
            message: 'Failed to create course',
            statusCode: 500,
        });
    }
};

export const updateCourse = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const course = await Course.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        }).populate('field', 'name slug');

        if (!course) {
            return ApiResponse.error(res, {
                message: 'Course not found',
                statusCode: 404,
            });
        }

        return ApiResponse.success(res, {
            data: course,
            message: 'Course updated successfully',
        });
    } catch (error) {
        console.error('Update course error:', error);
        return ApiResponse.error(res, {
            message: 'Failed to update course',
            statusCode: 500,
        });
    }
};

export const deleteCourse = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        const course = await Course.findByIdAndDelete(id);

        if (!course) {
            return ApiResponse.error(res, {
                message: 'Course not found',
                statusCode: 404,
            });
        }

        return ApiResponse.success(res, {
            message: 'Course deleted successfully',
        });
    } catch (error) {
        console.error('Delete course error:', error);
        return ApiResponse.error(res, {
            message: 'Failed to delete course',
            statusCode: 500,
        });
    }
};

export const togglePublishCourse = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { isPublished } = req.body;

        if (typeof isPublished !== 'boolean') {
            return ApiResponse.error(res, {
                message: 'isPublished must be a boolean value',
                statusCode: 400,
            });
        }

        const course = await Course.findByIdAndUpdate(id, { isPublished }, { new: true }).populate(
            'field',
            'name slug',
        );

        if (!course) {
            return ApiResponse.error(res, {
                message: 'Course not found',
                statusCode: 404,
            });
        }

        return ApiResponse.success(res, {
            data: course,
            message: `Course ${isPublished ? 'published' : 'unpublished'} successfully`,
        });
    } catch (error) {
        console.error('Toggle publish course error:', error);
        return ApiResponse.error(res, {
            message: 'Failed to toggle course publish status',
            statusCode: 500,
        });
    }
};
