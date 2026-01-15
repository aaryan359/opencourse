import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
import { User } from "../models/User";
import ApiResponse from "../utils/ApiResponse";

/* ================= LIST ALL USERS (ADMIN) ================= */
export const listUsers = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    const search = req.query.search as string;
    const role = req.query.role as string;

    const filter: Record<string, unknown> = {};

    if (search) {
      filter.$or = [
        { email: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } },
        { "profile.firstName": { $regex: search, $options: "i" } },
        { "profile.lastName": { $regex: search, $options: "i" } },
      ];
    }

    if (role) {
      filter.role = role;
    }

    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(filter);

    return ApiResponse.success(res, {
      data: users,
      message: "Users retrieved successfully",
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("List users error:", error);
    return ApiResponse.error(res, {
      message: "Failed to retrieve users",
      statusCode: 500,
    });
  }
};

/* ================= CHANGE USER ROLE (ADMIN) ================= */
export const changeUserRole = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const validRoles = ["student", "instructor", "admin", "super_admin"];

    if (!role || !validRoles.includes(role)) {
      return ApiResponse.error(res, {
        message: "Invalid role. Must be one of: " + validRoles.join(", "),
        statusCode: 400,
      });
    }

    // Prevent changing super_admin role unless you're super_admin
    const targetUser = await User.findById(id);
    
    if (!targetUser) {
      return ApiResponse.error(res, {
        message: "User not found",
        statusCode: 404,
      });
    }

    if (targetUser.role === "super_admin" && req.user?.role !== "super_admin") {
      return ApiResponse.error(res, {
        message: "Only super admins can change super admin roles",
        statusCode: 403,
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select("-password");

    return ApiResponse.success(res, {
      data: user,
      message: "User role updated successfully",
    });
  } catch (error) {
    console.error("Change user role error:", error);
    return ApiResponse.error(res, {
      message: "Failed to change user role",
      statusCode: 500,
    });
  }
};

/* ================= BAN/BLOCK USER (ADMIN) - OPTIONAL ================= */
export const banUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { banned, reason } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return ApiResponse.error(res, {
        message: "User not found",
        statusCode: 404,
      });
    }

    if (user.role === "super_admin") {
      return ApiResponse.error(res, {
        message: "Cannot ban super admin users",
        statusCode: 403,
      });
    }

    // You would need to add a banned field to your User model for this to work
    // For now, this is a placeholder implementation
    
    return ApiResponse.success(res, {
      message: banned ? "User banned successfully" : "User unbanned successfully",
      data: {
        userId: id,
        banned,
        reason,
      },
    });
  } catch (error) {
    console.error("Ban user error:", error);
    return ApiResponse.error(res, {
      message: "Failed to ban/unban user",
      statusCode: 500,
    });
  }
};