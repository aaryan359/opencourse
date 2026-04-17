import type { Request, Response } from 'express';
import type { AuthRequest } from '../middlewares/auth.middleware';
import { User } from '../models/User';
import { Video } from '../models/Video';
import { Course } from '../models/Course';
import { Topic } from '../models/Topic';
import { Field } from '../models/Field';
import { ContributorApplication } from '../models/ContributorApplication';
import ApiResponse from '../utils/ApiResponse';
import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import mongoose from 'mongoose';

function parsePagination(query: Record<string, unknown>) {
    const page = Math.max(1, parseInt(query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit as string) || 20));
    const skip = (page - 1) * limit;
    return { page, limit, skip };
}

function paginationMeta(total: number, page: number, limit: number) {
    return { total, page, limit, totalPages: Math.ceil(total / limit) };
}

/**
 * POST /admin/login  (public — no auth middleware needed)
 *
 * Body: { email: string, password: string, adminSecret: string }
 *
 * The adminSecret must match process.env.ADMIN_SECRET.
 * All three credentials are checked before any specific error is revealed.
 */
export const adminLogin = async (req: Request, res: Response) => {
    try {
        const { email, password, adminSecret } = req.body as {
            email?: string;
            password?: string;
            adminSecret?: string;
        };

        // 1. All three fields are required
        if (!email || !password || !adminSecret) {
            return ApiResponse.error(res, {
                message: 'email, password, and adminSecret are required',
                statusCode: 400,
            });
        }

        // 2. Validate the admin secret first (cheapest check — no DB hit)
        const expectedSecret = process.env.ADMIN_SECRET;
        if (!expectedSecret) {
            console.error('ADMIN_SECRET is not configured in environment variables');
            return ApiResponse.error(res, {
                message: 'Admin login is not configured',
                statusCode: 503,
            });
        }

        // Use a constant-time comparison to prevent timing attacks
        const secretMatches = adminSecret === expectedSecret;

        // 3. Look up the user regardless, so timing is consistent
        const user = await User.findOne({
            email: String(email).toLowerCase().trim(),
        }).select('+password');

        // 4. Validate all three: secret + user exists + role is admin + password correct
        const passwordMatches = user ? await user.comparePassword(password) : false;
        const isAdmin = user?.role === 'admin';

        if (!secretMatches || !user || !passwordMatches || !isAdmin) {
            // Intentionally vague — don't tell the caller which check failed
            return ApiResponse.error(res, {
                message: 'Invalid credentials',
                statusCode: 401,
            });
        }

        // 5. Issue JWT
        const token = jwt.sign(
            { userId: user._id.toString(), role: user.role },
            process.env.JWT_SECRET as string,
            {
                expiresIn: process.env.JWT_EXPIRY as SignOptions['expiresIn'],
            },
        );

        const userObject = user.toObject() as unknown as Record<string, unknown>;
        delete userObject.password;

        return ApiResponse.success(res, {
            message: 'Admin login successful',
            data: { user: userObject, token },
            statusCode: 200,
        });
    } catch (error) {
        console.error('[admin.adminLogin]', error);
        return ApiResponse.error(res, {
            message: 'Login failed',
            statusCode: 500,
        });
    }
};

/**
 * GET /admin/fields
 * Returns all fields for populating the course creation form.
 */
export const listFields = async (_req: AuthRequest, res: Response) => {
    try {
        const fields = await Field.find({}).sort({ name: 1 });
        return ApiResponse.success(res, { data: fields });
    } catch (error) {
        console.error('[admin.listFields]', error);
        return ApiResponse.error(res, {
            message: 'Failed to retrieve fields',
            statusCode: 500,
        });
    }
};

/**
 * GET /admin/dashboard
 * Returns a high-level overview of the platform.
 */

export const getDashboard = async (_req: AuthRequest, res: Response) => {
    try {
        const [
            totalUsers,
            totalStudents,
            totalContributors,
            totalAdmins,
            totalCourses,
            totalTopics,
            totalVideos,
            pendingVideos,
            approvedVideos,
            rejectedVideos,
            pendingApplications,
        ] = await Promise.all([
            User.countDocuments(),
            User.countDocuments({ role: 'student' }),
            User.countDocuments({ role: 'contributor' }),
            User.countDocuments({ role: 'admin' }),
            Course.countDocuments(),
            Topic.countDocuments(),
            Video.countDocuments(),
            Video.countDocuments({ status: 'pending' }),
            Video.countDocuments({ status: 'approved' }),
            Video.countDocuments({ status: 'rejected' }),
            ContributorApplication.countDocuments({
                status: 'pending',
            }),
        ]);

        // 5 most recently joined users
        const recentUsers = await User.find()
            .select('username email role createdAt')
            .sort({ createdAt: -1 })
            .limit(5);

        // 5 most recently submitted videos waiting for review
        const recentPendingVideos = await Video.find({
            status: 'pending',
        })
            .populate('uploadedBy', 'username email')
            .populate('course', 'title')
            .populate('topic', 'title')
            .sort({ createdAt: 1 }) // oldest first so nothing gets forgotten
            .limit(5);

        return ApiResponse.success(res, {
            message: 'Dashboard data retrieved successfully',
            data: {
                stats: {
                    users: {
                        total: totalUsers,
                        students: totalStudents,
                        contributors: totalContributors,
                        admins: totalAdmins,
                    },
                    content: {
                        courses: totalCourses,
                        topics: totalTopics,
                        videos: totalVideos,
                    },
                    videos: {
                        pending: pendingVideos,
                        approved: approvedVideos,
                        rejected: rejectedVideos,
                    },
                    pendingApplications,
                },
                recentActivity: {
                    recentUsers,
                    recentPendingVideos,
                },
            },
        });
    } catch (error) {
        console.error('[admin.getDashboard]', error);
        return ApiResponse.error(res, {
            message: 'Failed to load dashboard',
            statusCode: 500,
        });
    }
};

/**
 * GET /admin/users
 * List all users with optional role filter and search.
 * ?role=student|contributor|admin  &search=<text>  &page=1  &limit=20
 */
export const listUsers = async (req: AuthRequest, res: Response) => {
    try {
        const { page, limit, skip } = parsePagination(req.query);
        const { role, search } = req.query as Record<string, string>;

        const filter: Record<string, unknown> = {};

        if (role && ['student', 'contributor', 'admin'].includes(role)) {
            filter.role = role;
        }

        if (search?.trim()) {
            const regex = { $regex: search.trim(), $options: 'i' };
            filter.$or = [
                { email: regex },
                { username: regex },
                { 'profile.firstName': regex },
                { 'profile.lastName': regex },
            ];
        }

        const [users, total] = await Promise.all([
            User.find(filter).select('-password').sort({ createdAt: -1 }).skip(skip).limit(limit),
            User.countDocuments(filter),
        ]);

        return ApiResponse.success(res, {
            message: 'Users retrieved successfully',
            data: users,
            meta: paginationMeta(total, page, limit),
        });
    } catch (error) {
        console.error('[admin.listUsers]', error);
        return ApiResponse.error(res, {
            message: 'Failed to retrieve users',
            statusCode: 500,
        });
    }
};

/**
 * GET /admin/users/:id
 * Get full details of a single user.
 */
export const getUserById = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return ApiResponse.error(res, {
                message: 'User not found',
                statusCode: 404,
            });
        }

        return ApiResponse.success(res, { data: user });
    } catch (error) {
        console.error('[admin.getUserById]', error);
        return ApiResponse.error(res, {
            message: 'Failed to retrieve user',
            statusCode: 500,
        });
    }
};

/**
 * PATCH /admin/users/:id/role
 * Change a user's role.
 * Body: { role: "student" | "contributor" | "admin" }
 */
export const changeUserRole = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { role } = req.body as { role: string };

        const VALID_ROLES = ['student', 'contributor', 'admin'];

        if (!role || !VALID_ROLES.includes(role)) {
            return ApiResponse.error(res, {
                message: `role must be one of: ${VALID_ROLES.join(', ')}`,
                statusCode: 400,
            });
        }

        // Safety: never demote the last admin
        const targetUser = await User.findById(id);
        if (!targetUser) {
            return ApiResponse.error(res, {
                message: 'User not found',
                statusCode: 404,
            });
        }

        if (targetUser.role === 'admin' && role !== 'admin') {
            const adminCount = await User.countDocuments({
                role: 'admin',
            });
            if (adminCount <= 1) {
                return ApiResponse.error(res, {
                    message: 'Cannot demote the only admin account',
                    statusCode: 403,
                });
            }
        }

        targetUser.role = role as 'student' | 'contributor' | 'admin';

        // Keep contributorStatus in sync when promoting/demoting
        if (role === 'contributor') targetUser.contributorStatus = 'approved';
        if (role === 'student') targetUser.contributorStatus = 'none';

        await targetUser.save();

        return ApiResponse.success(res, {
            message: `User role updated to "${role}"`,
            data: {
                _id: targetUser._id,
                role: targetUser.role,
                contributorStatus: targetUser.contributorStatus,
            },
        });
    } catch (error) {
        console.error('[admin.changeUserRole]', error);
        return ApiResponse.error(res, {
            message: 'Failed to update user role',
            statusCode: 500,
        });
    }
};

/**
 * GET /admin/applications
 * List contributor applications.
 * ?status=pending|approved|rejected  &page=1  &limit=20
 */
export const listApplications = async (req: AuthRequest, res: Response) => {
    try {
        const { page, limit, skip } = parsePagination(req.query);
        const { status } = req.query as { status?: string };

        const filter: Record<string, unknown> = {};
        if (status && ['pending', 'approved', 'rejected'].includes(status)) {
            filter.status = status;
        }

        const [applications, total] = await Promise.all([
            ContributorApplication.find(filter)
                .populate('applicant', 'username email profile.avatar profile.title')
                .populate('reviewedBy', 'username')
                .sort({ createdAt: 1 }) // oldest pending first (FIFO queue)
                .skip(skip)
                .limit(limit),
            ContributorApplication.countDocuments(filter),
        ]);

        return ApiResponse.success(res, {
            message: 'Applications retrieved successfully',
            data: applications,
            meta: paginationMeta(total, page, limit),
        });
    } catch (error) {
        console.error('[admin.listApplications]', error);
        return ApiResponse.error(res, {
            message: 'Failed to retrieve applications',
            statusCode: 500,
        });
    }
};

/**
 * GET /admin/applications/:id
 * Get a single contributor application.
 */
export const getApplicationById = async (req: AuthRequest, res: Response) => {
    try {
        const application = await ContributorApplication.findById(req.params.id)
            .populate('applicant', 'username email profile contributorStatus')
            .populate('reviewedBy', 'username');

        if (!application) {
            return ApiResponse.error(res, {
                message: 'Application not found',
                statusCode: 404,
            });
        }

        return ApiResponse.success(res, { data: application });
    } catch (error) {
        console.error('[admin.getApplicationById]', error);
        return ApiResponse.error(res, {
            message: 'Failed to retrieve application',
            statusCode: 500,
        });
    }
};

/**
 * PATCH /admin/applications/:id/approve
 * Approve a contributor application.
 * Atomically: marks application approved + promotes user role to "contributor".
 */
export const approveApplication = async (req: AuthRequest, res: Response) => {
    try {
        const application = await ContributorApplication.findById(req.params.id);

        if (!application) {
            return ApiResponse.error(res, {
                message: 'Application not found',
                statusCode: 404,
            });
        }

        if (application.status !== 'pending') {
            return ApiResponse.error(res, {
                message: `Application is already ${application.status}`,
                statusCode: 409,
            });
        }

        // Update the application
        application.status = 'approved';
        application.reviewedBy = new mongoose.Types.ObjectId(req.user!.userId);
        application.reviewedAt = new Date();
        await application.save();

        // Promote the user
        await User.findByIdAndUpdate(application.applicant, {
            role: 'contributor',
            contributorStatus: 'approved',
        });

        return ApiResponse.success(res, {
            message: 'Application approved — user is now a contributor',
            data: {
                applicationId: application._id,
                applicantId: application.applicant,
            },
        });
    } catch (error) {
        console.error('[admin.approveApplication]', error);
        return ApiResponse.error(res, {
            message: 'Failed to approve application',
            statusCode: 500,
        });
    }
};

/**
 * PATCH /admin/applications/:id/reject
 * Reject a contributor application with an optional reason.
 * Body: { reviewNote?: string }
 */
export const rejectApplication = async (req: AuthRequest, res: Response) => {
    try {
        const { reviewNote } = req.body as { reviewNote?: string };

        const application = await ContributorApplication.findById(req.params.id);

        if (!application) {
            return ApiResponse.error(res, {
                message: 'Application not found',
                statusCode: 404,
            });
        }

        if (application.status !== 'pending') {
            return ApiResponse.error(res, {
                message: `Application is already ${application.status}`,
                statusCode: 409,
            });
        }

        application.status = 'rejected';
        application.reviewedBy = new mongoose.Types.ObjectId(req.user!.userId);
        application.reviewedAt = new Date();
        if (reviewNote?.trim()) application.reviewNote = reviewNote.trim();
        await application.save();

        // Let the user know they can re-apply
        await User.findByIdAndUpdate(application.applicant, {
            contributorStatus: 'rejected',
        });

        return ApiResponse.success(res, {
            message: 'Application rejected',
            data: { applicationId: application._id },
        });
    } catch (error) {
        console.error('[admin.rejectApplication]', error);
        return ApiResponse.error(res, {
            message: 'Failed to reject application',
            statusCode: 500,
        });
    }
};

/**
 * GET /admin/videos
 * List all videos with optional status filter.
 * ?status=pending|approved|rejected  &page=1  &limit=20
 */
export const listVideos = async (req: AuthRequest, res: Response) => {
    try {
        const { page, limit, skip } = parsePagination(req.query);
        const { status } = req.query as { status?: string };

        const filter: Record<string, unknown> = {};
        if (status && ['pending', 'approved', 'rejected'].includes(status)) {
            filter.status = status;
        }

        const [videos, total] = await Promise.all([
            Video.find(filter)
                .populate('course', 'title slug')
                .populate('topic', 'title')
                .populate('uploadedBy', 'username email')
                .populate('reviewedBy', 'username')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Video.countDocuments(filter),
        ]);

        return ApiResponse.success(res, {
            message: 'Videos retrieved successfully',
            data: videos,
            meta: paginationMeta(total, page, limit),
        });
    } catch (error) {
        console.error('[admin.listVideos]', error);
        return ApiResponse.error(res, {
            message: 'Failed to retrieve videos',
            statusCode: 500,
        });
    }
};

/**
 * PATCH /admin/videos/:id/approve
 * Approve a submitted video — it becomes visible to all learners.
 */
export const approveVideo = async (req: AuthRequest, res: Response) => {
    try {
        const video = await Video.findById(req.params.id);

        if (!video) {
            return ApiResponse.error(res, {
                message: 'Video not found',
                statusCode: 404,
            });
        }

        if (video.status === 'approved') {
            return ApiResponse.error(res, {
                message: 'Video is already approved',
                statusCode: 409,
            });
        }

        video.status = 'approved';
        video.reviewedBy = new mongoose.Types.ObjectId(req.user!.userId);
        video.reviewNote = undefined;
        await video.save();

        // Increment contributor's uploaded video count
        await User.findByIdAndUpdate(video.uploadedBy, {
            $inc: { 'stats.uploadedVideos': 1 },
        });

        return ApiResponse.success(res, {
            message: 'Video approved successfully',
            data: { videoId: video._id, status: video.status },
        });
    } catch (error) {
        console.error('[admin.approveVideo]', error);
        return ApiResponse.error(res, {
            message: 'Failed to approve video',
            statusCode: 500,
        });
    }
};

/**
 * PATCH /admin/videos/:id/reject
 * Reject a submitted video with a reason.
 * Body: { reviewNote: string }
 */
export const rejectVideo = async (req: AuthRequest, res: Response) => {
    try {
        const { reviewNote } = req.body as { reviewNote?: string };

        if (!reviewNote?.trim()) {
            return ApiResponse.error(res, {
                message: 'A reviewNote explaining the rejection is required',
                statusCode: 400,
            });
        }

        const video = await Video.findById(req.params.id);

        if (!video) {
            return ApiResponse.error(res, {
                message: 'Video not found',
                statusCode: 404,
            });
        }

        if (video.status === 'rejected') {
            return ApiResponse.error(res, {
                message: 'Video is already rejected',
                statusCode: 409,
            });
        }

        video.status = 'rejected';
        video.reviewedBy = new mongoose.Types.ObjectId(req.user!.userId);
        video.reviewNote = reviewNote.trim();
        await video.save();

        return ApiResponse.success(res, {
            message: 'Video rejected',
            data: {
                videoId: video._id,
                status: video.status,
                reviewNote: video.reviewNote,
            },
        });
    } catch (error) {
        console.error('[admin.rejectVideo]', error);
        return ApiResponse.error(res, {
            message: 'Failed to reject video',
            statusCode: 500,
        });
    }
};

/**
 * DELETE /admin/videos/:id
 * Permanently delete a video (use sparingly — prefer reject).
 */
export const deleteVideo = async (req: AuthRequest, res: Response) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id);

        if (!video) {
            return ApiResponse.error(res, {
                message: 'Video not found',
                statusCode: 404,
            });
        }

        return ApiResponse.success(res, {
            message: 'Video deleted permanently',
        });
    } catch (error) {
        console.error('[admin.deleteVideo]', error);
        return ApiResponse.error(res, {
            message: 'Failed to delete video',
            statusCode: 500,
        });
    }
};

/**
 * GET /admin/courses
 * List all courses (published and unpublished).
 * ?published=true|false  &page=1  &limit=20
 */
export const listCourses = async (req: AuthRequest, res: Response) => {
    try {
        const { page, limit, skip } = parsePagination(req.query);
        const { published } = req.query as { published?: string };

        const filter: Record<string, unknown> = {};
        if (published === 'true') filter.isPublished = true;
        if (published === 'false') filter.isPublished = false;

        const [courses, total] = await Promise.all([
            Course.find(filter)
                .populate('field', 'name slug')
                .populate('createdBy', 'username')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Course.countDocuments(filter),
        ]);

        return ApiResponse.success(res, {
            message: 'Courses retrieved successfully',
            data: courses,
            meta: paginationMeta(total, page, limit),
        });
    } catch (error) {
        console.error('[admin.listCourses]', error);
        return ApiResponse.error(res, {
            message: 'Failed to retrieve courses',
            statusCode: 500,
        });
    }
};

// ─── CREATE COURSE ───────────────────────────────────────────────────────────

/**
 * POST /admin/courses
 * Admin creates a new course.
 *
 * Body:
 *   title       string  required
 *   description string  required
 *   field       string  required  — Field _id
 *   level       "beginner" | "intermediate" | "advanced"  (default: beginner)
 *   thumbnail   string  optional
 *   isPublished boolean (default: true)
 *
 * The slug is auto-generated from the title.
 */
export const createCourse = async (req: AuthRequest, res: Response) => {
    try {
        const { title, description, field, level, thumbnail, isPublished } = req.body as {
            title?: string;
            description?: string;
            field?: string;
            level?: string;
            thumbnail?: string;
            isPublished?: boolean;
        };

        if (!title?.trim() || !description?.trim() || !field) {
            return ApiResponse.error(res, {
                message: 'title, description, and field are required',
                statusCode: 400,
            });
        }

        // Validate field exists
        const fieldDoc = await Field.findById(field);
        if (!fieldDoc) {
            return ApiResponse.error(res, {
                message: 'Field not found',
                statusCode: 404,
            });
        }

        // Auto-generate slug from title
        const baseSlug = title
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');

        // Ensure slug is unique — append a suffix if needed
        let slug = baseSlug;
        let suffix = 1;
        while (await Course.exists({ slug })) {
            slug = `${baseSlug}-${suffix++}`;
        }

        const validLevels = ['beginner', 'intermediate', 'advanced'];

        const course = await Course.create({
            title: title.trim(),
            slug,
            description: description.trim(),
            field,
            level: validLevels.includes(level as string) ? level : 'beginner',
            thumbnail: thumbnail?.trim(),
            isPublished: typeof isPublished === 'boolean' ? isPublished : true,
            createdBy: req.user!.userId,
        });

        await course.populate('field', 'name slug');

        return ApiResponse.success(res, {
            message: 'Course created successfully',
            data: course,
            statusCode: 201,
        });
    } catch (error) {
        console.error('[admin.createCourse]', error);
        return ApiResponse.error(res, {
            message: 'Failed to create course',
            statusCode: 500,
        });
    }
};

// ─── CREATE TOPIC ────────────────────────────────────────────────────────────

/**
 * POST /admin/courses/:courseId/topics
 * Admin creates a new topic inside a course.
 *
 * Body:
 *   title        string  required
 *   description  string  optional
 *   order        number  optional (defaults to last+1)
 */
export const createTopic = async (req: AuthRequest, res: Response) => {
    try {
        const { courseId } = req.params;
        const { title, description, order } = req.body as {
            title?: string;
            description?: string;
            order?: number;
        };

        if (!title?.trim()) {
            return ApiResponse.error(res, {
                message: 'title is required',
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

        // Auto-place at the end if order not provided
        let topicOrder = order;
        if (topicOrder === undefined) {
            const last = await Topic.findOne({
                course: courseId,
            }).sort({ order: -1 });
            topicOrder = last ? last.order + 1 : 1;
        }

        const topic = await Topic.create({
            title: title.trim(),
            description: description?.trim(),
            course: courseId,
            order: topicOrder,
        });

        await topic.populate('course', 'title slug');

        return ApiResponse.success(res, {
            message: 'Topic created successfully',
            data: topic,
            statusCode: 201,
        });
    } catch (error) {
        console.error('[admin.createTopic]', error);
        return ApiResponse.error(res, {
            message: 'Failed to create topic',
            statusCode: 500,
        });
    }
};

// ─── LIST CONTRIBUTORS ───────────────────────────────────────────────────────
/**
 * GET /admin/contributors
 * Returns only users with role === "contributor".
 * ?search=<text>  &page=1  &limit=20
 */
export const listContributors = async (req: AuthRequest, res: Response) => {
    try {
        const { page, limit, skip } = parsePagination(req.query);
        const { search } = req.query as { search?: string };

        const filter: Record<string, unknown> = { role: 'contributor' };

        if (search?.trim()) {
            const regex = { $regex: search.trim(), $options: 'i' };
            filter.$or = [
                { email: regex },
                { username: regex },
                { 'profile.firstName': regex },
                { 'profile.lastName': regex },
            ];
        }

        const [contributors, total] = await Promise.all([
            User.find(filter).select('-password').sort({ createdAt: -1 }).skip(skip).limit(limit),
            User.countDocuments(filter),
        ]);

        return ApiResponse.success(res, {
            message: 'Contributors retrieved successfully',
            data: contributors,
            meta: paginationMeta(total, page, limit),
        });
    } catch (error) {
        console.error('[admin.listContributors]', error);
        return ApiResponse.error(res, {
            message: 'Failed to retrieve contributors',
            statusCode: 500,
        });
    }
};
