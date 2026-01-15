import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
import { Course } from "../models/Course";
import { Video } from "../models/Video";
import { Field } from "../models/Field";
import ApiResponse from "../utils/ApiResponse";

/* ================= GLOBAL SEARCH ================= */
export const globalSearch = async (req: AuthRequest, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
      return ApiResponse.error(res, {
        message: "Search query is required",
        statusCode: 400,
      });
    }

    const searchRegex = new RegExp(q, "i");

    // Search courses
    const courses = await Course.find({
      isPublished: true,
      $or: [
        { title: searchRegex },
        { description: searchRegex },
      ],
    })
      .populate("field", "name slug")
      .limit(10);

    // Search videos
    const videos = await Video.find({
      status: "approved",
      $or: [
        { title: searchRegex },
        { description: searchRegex },
      ],
    })
      .populate("course", "title slug")
      .populate("topic", "title")
      .limit(10);

    // Search fields
    const fields = await Field.find({
      $or: [
        { name: searchRegex },
        { description: searchRegex },
      ],
    }).limit(5);

    return ApiResponse.success(res, {
      data: {
        courses,
        videos,
        fields,
      },
      message: "Search results retrieved successfully",
    });
  } catch (error) {
    console.error("Global search error:", error);
    return ApiResponse.error(res, {
      message: "Search failed",
      statusCode: 500,
    });
  }
};

/* ================= SEARCH COURSES ================= */
export const searchCourses = async (req: AuthRequest, res: Response) => {
  try {
    const { q } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;

    if (!q || typeof q !== "string") {
      return ApiResponse.error(res, {
        message: "Search query is required",
        statusCode: 400,
      });
    }

    const searchRegex = new RegExp(q, "i");

    const courses = await Course.find({
      isPublished: true,
      $or: [
        { title: searchRegex },
        { description: searchRegex },
      ],
    })
      .populate("field", "name slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Course.countDocuments({
      isPublished: true,
      $or: [
        { title: searchRegex },
        { description: searchRegex },
      ],
    });

    return ApiResponse.success(res, {
      data: courses,
      message: "Courses found",
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        query: q,
      },
    });
  } catch (error) {
    console.error("Search courses error:", error);
    return ApiResponse.error(res, {
      message: "Course search failed",
      statusCode: 500,
    });
  }
};

/* ================= SEARCH VIDEOS ================= */
export const searchVideos = async (req: AuthRequest, res: Response) => {
  try {
    const { q } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    if (!q || typeof q !== "string") {
      return ApiResponse.error(res, {
        message: "Search query is required",
        statusCode: 400,
      });
    }

    const searchRegex = new RegExp(q, "i");

    const videos = await Video.find({
      status: "approved",
      $or: [
        { title: searchRegex },
        { description: searchRegex },
      ],
    })
      .populate("course", "title slug")
      .populate("topic", "title")
      .populate("uploadedBy", "username profile.avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Video.countDocuments({
      status: "approved",
      $or: [
        { title: searchRegex },
        { description: searchRegex },
      ],
    });

    return ApiResponse.success(res, {
      data: videos,
      message: "Videos found",
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        query: q,
      },
    });
  } catch (error) {
    console.error("Search videos error:", error);
    return ApiResponse.error(res, {
      message: "Video search failed",
      statusCode: 500,
    });
  }
};

/* ================= GET TRENDING CONTENT ================= */
export const getTrending = async (req: AuthRequest, res: Response) => {
  try {
    // Get recently added courses
    const trendingCourses = await Course.find({ isPublished: true })
      .populate("field", "name slug")
      .sort({ createdAt: -1 })
      .limit(6);

    // Get recently approved videos
    const trendingVideos = await Video.find({ status: "approved" })
      .populate("course", "title slug")
      .populate("uploadedBy", "username profile.avatar")
      .sort({ createdAt: -1 })
      .limit(10);

    return ApiResponse.success(res, {
      data: {
        courses: trendingCourses,
        videos: trendingVideos,
      },
      message: "Trending content retrieved successfully",
    });
  } catch (error) {
    console.error("Get trending error:", error);
    return ApiResponse.error(res, {
      message: "Failed to retrieve trending content",
      statusCode: 500,
    });
  }
};