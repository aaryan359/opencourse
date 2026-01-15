import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
import { Video } from "../models/Video";
import ApiResponse from "../utils/ApiResponse";
import { Types } from "mongoose";

/* ================= GET PENDING VIDEOS (ADMIN) ================= */
export const getPendingVideos = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const videos = await Video.find({ status: "pending" })
      .populate("topic", "title")
      .populate("course", "title slug")
      .populate("uploadedBy", "username email profile.avatar")
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Video.countDocuments({ status: "pending" });

    return ApiResponse.success(res, {
      data: videos,
      message: "Pending videos retrieved successfully",
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get pending videos error:", error);
    return ApiResponse.error(res, {
      message: "Failed to retrieve pending videos",
      statusCode: 500,
    });
  }
};

/* ================= APPROVE VIDEO (ADMIN) ================= */
export const approveVideo = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const reviewerId = req.user?.userId;  // Ensure this is ObjectId or convert it

    const video = await Video.findById(id);

    if (!video) {
      return ApiResponse.error(res, {
        message: "Video not found",
        statusCode: 404,
      });
    }

    if (video.status !== "pending") {
      return ApiResponse.error(res, {
        message: "Video is not pending approval",
        statusCode: 400,
      });
    }

    video.status = "approved";
    video.reviewedBy = reviewerId ? new Types.ObjectId(reviewerId) : undefined;  // Convert to ObjectId
    await video.save();

    await video.populate([
      { path: "topic", select: "title" },
      { path: "course", select: "title slug" },
      { path: "uploadedBy", select: "username" },
    ]);

    return ApiResponse.success(res, {
      data: video,
      message: "Video approved successfully",
    });
  } catch (error) {
    console.error("Approve video error:", error);
    return ApiResponse.error(res, {
      message: "Failed to approve video",
      statusCode: 500,
    });
  }
};

/* ================= REJECT VIDEO (ADMIN) ================= */
export const rejectVideo = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const reviewerId = req.user?.userId;  // Ensure this is ObjectId or convert it
    const { reviewNote } = req.body;

    const video = await Video.findById(id);

    if (!video) {
      return ApiResponse.error(res, {
        message: "Video not found",
        statusCode: 404,
      });
    }

    if (video.status !== "pending") {
      return ApiResponse.error(res, {
        message: "Video is not pending approval",
        statusCode: 400,
      });
    }

    video.status = "rejected";
    video.reviewedBy = reviewerId ? new Types.ObjectId(reviewerId) : undefined;  // Convert to ObjectId
    video.reviewNote = reviewNote || "Does not meet quality standards";
    await video.save();

    await video.populate([
      { path: "topic", select: "title" },
      { path: "course", select: "title slug" },
      { path: "uploadedBy", select: "username email" },
    ]);

    return ApiResponse.success(res, {
      data: video,
      message: "Video rejected successfully",
    });
  } catch (error) {
    console.error("Reject video error:", error);
    return ApiResponse.error(res, {
      message: "Failed to reject video",
      statusCode: 500,
    });
  }
};

/* ================= DELETE VIDEO (ADMIN) ================= */
export const deleteVideo = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const video = await Video.findByIdAndDelete(id);

    if (!video) {
      return ApiResponse.error(res, {
        message: "Video not found",
        statusCode: 404,
      });
    }

    return ApiResponse.success(res, {
      message: "Video deleted successfully",
    });
  } catch (error) {
    console.error("Delete video error:", error);
    return ApiResponse.error(res, {
      message: "Failed to delete video",
      statusCode: 500,
    });
  }
};