import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
import { Enrollment } from "../models/Enrollment";
import { Course } from "../models/Course";
import { User } from "../models/User";
import ApiResponse from "../utils/ApiResponse";

/* ================= ENROLL IN COURSE (USER) ================= */
export const enrollInCourse = async (req: AuthRequest, res: Response) => {
  try {
    const { id: courseId } = req.params;
    const userId = req.user?.userId;

    const course = await Course.findById(courseId);

    if (!course || !course.isPublished) {
      return ApiResponse.error(res, {
        message: "Course not found or not published",
        statusCode: 404,
      });
    }

    const existingEnrollment = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });

    if (existingEnrollment) {
      return ApiResponse.error(res, {
        message: "Already enrolled in this course",
        statusCode: 409,
      });
    }

    const enrollment = await Enrollment.create({
      user: userId,
      course: courseId,
    });

    // Update user stats
    await User.findByIdAndUpdate(userId, {
      $inc: { "stats.totalCourses": 1 },
    });

    await enrollment.populate([
      { path: "course", select: "title slug description thumbnail" },
    ]);

    return ApiResponse.success(res, {
      data: enrollment,
      message: "Successfully enrolled in course",
      statusCode: 201,
    });
  } catch (error) {
    console.error("Enroll in course error:", error);
    return ApiResponse.error(res, {
      message: "Failed to enroll in course",
      statusCode: 500,
    });
  }
};

/* ================= GET USER ENROLLMENTS (USER) ================= */
export const getUserEnrollments = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status as string;

    const filter: Record<string, unknown> = { user: userId };

    if (status) {
      filter.status = status;
    }

    const enrollments = await Enrollment.find(filter)
      .populate("course", "title slug description thumbnail level")
      .sort({ enrolledAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Enrollment.countDocuments(filter);

    return ApiResponse.success(res, {
      data: enrollments,
      message: "Enrollments retrieved successfully",
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get user enrollments error:", error);
    return ApiResponse.error(res, {
      message: "Failed to retrieve enrollments",
      statusCode: 500,
    });
  }
};

/* ================= GET COURSE PROGRESS (USER) ================= */
export const getCourseProgress = async (req: AuthRequest, res: Response) => {
  try {
    const { courseId } = req.params;
    const userId = req.user?.userId;

    const enrollment = await Enrollment.findOne({
      user: userId,
      course: courseId,
    })
      .populate("course", "title slug")
      .populate("progress.lastWatchedVideo", "title");

    if (!enrollment) {
      return ApiResponse.error(res, {
        message: "Not enrolled in this course",
        statusCode: 404,
      });
    }

    return ApiResponse.success(res, {
      data: enrollment,
      message: "Course progress retrieved successfully",
    });
  } catch (error) {
    console.error("Get course progress error:", error);
    return ApiResponse.error(res, {
      message: "Failed to retrieve course progress",
      statusCode: 500,
    });
  }
};

/* ================= UPDATE COURSE PROGRESS (USER) ================= */
export const updateCourseProgress = async (req: AuthRequest, res: Response) => {
  try {
    const { courseId } = req.params;
    const userId = req.user?.userId;
    const { videoId, watchTime } = req.body;

    const enrollment = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });

    if (!enrollment) {
      return ApiResponse.error(res, {
        message: "Not enrolled in this course",
        statusCode: 404,
      });
    }

    // Add video to completed videos if not already there
    if (videoId && !enrollment.progress.completedVideos.includes(videoId)) {
      enrollment.progress.completedVideos.push(videoId);
      enrollment.progress.lastWatchedVideo = videoId;

      // Update user stats
      await User.findByIdAndUpdate(userId, {
        $inc: { "stats.totalVideosWatched": 1 },
      });
    }

    // Update watch time
    if (watchTime) {
      enrollment.progress.totalWatchTime += watchTime;

      // Update user stats
      await User.findByIdAndUpdate(userId, {
        $inc: { "stats.totalWatchTime": watchTime },
      });
    }

    // Calculate completion percentage (you'd need to get total videos in course)
    // For now, this is a placeholder
    enrollment.progress.completionPercentage = Math.min(
      (enrollment.progress.completedVideos.length / 10) * 100,
      100
    );

    // Mark as completed if 100%
    if (enrollment.progress.completionPercentage === 100 && enrollment.status !== "completed") {
      enrollment.status = "completed";
      enrollment.completedAt = new Date();

      // Update user stats
      await User.findByIdAndUpdate(userId, {
        $inc: { "stats.completedCourses": 1 },
      });
    }

    await enrollment.save();

    return ApiResponse.success(res, {
      data: enrollment,
      message: "Progress updated successfully",
    });
  } catch (error) {
    console.error("Update course progress error:", error);
    return ApiResponse.error(res, {
      message: "Failed to update progress",
      statusCode: 500,
    });
  }
};