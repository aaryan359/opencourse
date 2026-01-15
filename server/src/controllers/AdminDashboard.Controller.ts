import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
import { User } from "../models/User";
import { Course } from "../models/Course";
import { Video } from "../models/Video";
import { Enrollment } from "../models/Enrollment";
import { Field } from "../models/Field";
import ApiResponse from "../utils/ApiResponse";

/* ================= GET ADMIN STATS ================= */
export const getAdminStats = async (req: AuthRequest, res: Response) => {
  try {
    const [
      totalUsers,
      totalCourses,
      totalVideos,
      pendingVideos,
      totalEnrollments,
      totalFields,
      approvedVideos,
      rejectedVideos,
    ] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      Video.countDocuments(),
      Video.countDocuments({ status: "pending" }),
      Enrollment.countDocuments(),
      Field.countDocuments(),
      Video.countDocuments({ status: "approved" }),
      Video.countDocuments({ status: "rejected" }),
    ]);

    // Get recent users
    const recentUsers = await User.find()
      .select("username email createdAt role")
      .sort({ createdAt: -1 })
      .limit(5);

    // Get recent enrollments
    const recentEnrollments = await Enrollment.find()
      .populate("user", "username email")
      .populate("course", "title slug")
      .sort({ enrolledAt: -1 })
      .limit(5);

    const stats = {
      overview: {
        totalUsers,
        totalCourses,
        totalVideos,
        pendingVideos,
        approvedVideos,
        rejectedVideos,
        totalEnrollments,
        totalFields,
      },
      recentActivity: {
        recentUsers,
        recentEnrollments,
      },
    };

    return ApiResponse.success(res, {
      data: stats,
      message: "Admin stats retrieved successfully",
    });
  } catch (error) {
    console.error("Get admin stats error:", error);
    return ApiResponse.error(res, {
      message: "Failed to retrieve admin stats",
      statusCode: 500,
    });
  }
};

/* ================= GET ALL COURSES (ADMIN) ================= */
export const getAdminCourses = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    const status = req.query.status as string; // published/unpublished

    const filter: Record<string, unknown> = {};

    if (status === "published") {
      filter.isPublished = true;
    } else if (status === "unpublished") {
      filter.isPublished = false;
    }

    const courses = await Course.find(filter)
      .populate("field", "name slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Course.countDocuments(filter);

    return ApiResponse.success(res, {
      data: courses,
      message: "Courses retrieved successfully",
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get admin courses error:", error);
    return ApiResponse.error(res, {
      message: "Failed to retrieve courses",
      statusCode: 500,
    });
  }
};

/* ================= GET ALL VIDEOS (ADMIN) ================= */
export const getAdminVideos = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    const status = req.query.status as string;

    const filter: Record<string, unknown> = {};

    if (status) {
      filter.status = status;
    }

    const videos = await Video.find(filter)
      .populate("course", "title slug")
      .populate("topic", "title")
      .populate("uploadedBy", "username email")
      .populate("reviewedBy", "username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Video.countDocuments(filter);

    return ApiResponse.success(res, {
      data: videos,
      message: "Videos retrieved successfully",
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get admin videos error:", error);
    return ApiResponse.error(res, {
      message: "Failed to retrieve videos",
      statusCode: 500,
    });
  }
};

/* ================= GET ENROLLMENT STATS (ADMIN) ================= */
export const getEnrollmentStats = async (req: AuthRequest, res: Response) => {
  try {
    const totalEnrollments = await Enrollment.countDocuments();
    const activeEnrollments = await Enrollment.countDocuments({
      status: "active",
    });
    const completedEnrollments = await Enrollment.countDocuments({
      status: "completed",
    });
    const droppedEnrollments = await Enrollment.countDocuments({
      status: "dropped",
    });

    // Define interface for aggregation result
    interface PopularCourseAggregation {
      _id: any;
      enrollmentCount: number;
    }

    // Get most popular courses
    const popularCourses = await Enrollment.aggregate<PopularCourseAggregation>([
      {
        $group: {
          _id: "$course",
          enrollmentCount: { $sum: 1 },
        },
      },
      { $sort: { enrollmentCount: -1 } },
      { $limit: 10 },
    ]);

    // Populate course details
    const populatedCourses = await Course.populate(popularCourses, {
      path: "_id",
      select: "title slug thumbnail",
    });

    const stats = {
      totalEnrollments,
      activeEnrollments,
      completedEnrollments,
      droppedEnrollments,
      popularCourses: populatedCourses.map((item: any) => ({
        course: item._id,
        enrollments: item.enrollmentCount,
      })),
    };

    return ApiResponse.success(res, {
      data: stats,
      message: "Enrollment stats retrieved successfully",
    });
  } catch (error) {
    console.error("Get enrollment stats error:", error);
    return ApiResponse.error(res, {
      message: "Failed to retrieve enrollment stats",
      statusCode: 500,
    });
  }
};