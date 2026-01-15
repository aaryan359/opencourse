import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
import { User } from "../models/User";
import { Video } from "../models/Video";
import ApiResponse from "../utils/ApiResponse";
import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

/* ================= REGISTER ================= */
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username, profile } = req.body;

    if (!email || !password || !username) {
      return ApiResponse.error(res, {
        message: "Email, username and password are required",
        statusCode: 400,
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return ApiResponse.error(res, {
        message: "User already exists",
        statusCode: 400,
      });
    }

    const user = await User.create({
      email,
      password,
      username,
      profile,
    });

    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRY as SignOptions["expiresIn"],
      }
    );

    return ApiResponse.success(res, {
      message: "User registered successfully",
      data: {
        user,
        token,
      },
      statusCode: 201,
    });
  } catch (error) {
    console.error("Register error:", error);
    return ApiResponse.error(res, {
      message: "Registration failed",
      statusCode: 500,
    });
  }
};

/* ================= LOGIN ================= */
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return ApiResponse.error(res, {
        message: "Email and password are required",
        statusCode: 400,
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return ApiResponse.error(res, {
        message: "Invalid email or password",
        statusCode: 401,
      });
    }

    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRY as SignOptions["expiresIn"],
      }
    );

    // Remove password from response
    const userObject = user.toJSON();

    return ApiResponse.success(res, {
      message: "Login successful",
      data: { user: userObject, token },
      statusCode: 200,
    });
  } catch (error) {
    console.error("Login error:", error);
    return ApiResponse.error(res, {
      message: "Login failed",
      statusCode: 500,
    });
  }
};

/* ================= LOGOUT ================= */
export const logoutUser = async (_req: Request, res: Response) => {
  return ApiResponse.success(res, {
    message: "Logged out successfully",
    statusCode: 200,
  });
};

/* ================= GET CURRENT USER ================= */
export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.userId) {
      return ApiResponse.error(res, {
        message: "Unauthorized",
        statusCode: 401,
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return ApiResponse.error(res, {
        message: "User not found",
        statusCode: 404,
      });
    }

    return ApiResponse.success(res, {
      data: user,
      statusCode: 200,
    });
  } catch (error) {
    console.error("Get current user error:", error);
    return ApiResponse.error(res, {
      message: "Failed to retrieve user",
      statusCode: 500,
    });
  }
};

/* ================= REFRESH TOKEN ================= */
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return ApiResponse.error(res, {
        message: "Refresh token required",
        statusCode: 400,
      });
    }

    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string
    ) as { userId: string; role: string };

    const newAccessToken = jwt.sign(
      { userId: payload.userId, role: payload.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRY as SignOptions["expiresIn"],
      }
    );

    return ApiResponse.success(res, {
      data: { token: newAccessToken },
      statusCode: 200,
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    return ApiResponse.error(res, {
      message: "Invalid refresh token",
      statusCode: 401,
    });
  }
};

/* ================= GET PUBLIC USER PROFILE ================= */
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return ApiResponse.error(res, {
        message: "User not found",
        statusCode: 404,
      });
    }

    return ApiResponse.success(res, {
      data: user,
      message: "User profile retrieved successfully",
    });
  } catch (error) {
    console.error("Get user profile error:", error);
    return ApiResponse.error(res, {
      message: "Failed to retrieve user profile",
      statusCode: 500,
    });
  }
};

/* ================= UPDATE OWN PROFILE ================= */
export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { profile } = req.body;

    if (!profile) {
      return ApiResponse.error(res, {
        message: "Profile data is required",
        statusCode: 400,
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { profile } },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return ApiResponse.error(res, {
        message: "User not found",
        statusCode: 404,
      });
    }

    return ApiResponse.success(res, {
      data: user,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return ApiResponse.error(res, {
      message: "Failed to update profile",
      statusCode: 500,
    });
  }
};

/* ================= CHANGE PASSWORD ================= */
export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return ApiResponse.error(res, {
        message: "Current password and new password are required",
        statusCode: 400,
      });
    }

    if (newPassword.length < 6) {
      return ApiResponse.error(res, {
        message: "New password must be at least 6 characters",
        statusCode: 400,
      });
    }

    const user = await User.findById(userId).select("+password");

    if (!user) {
      return ApiResponse.error(res, {
        message: "User not found",
        statusCode: 404,
      });
    }

    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      return ApiResponse.error(res, {
        message: "Current password is incorrect",
        statusCode: 401,
      });
    }

    user.password = newPassword;
    await user.save();

    return ApiResponse.success(res, {
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    return ApiResponse.error(res, {
      message: "Failed to change password",
      statusCode: 500,
    });
  }
};

/* ================= GET USER STATS ================= */
export const getUserStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    const user = await User.findById(userId).select("stats");

    if (!user) {
      return ApiResponse.error(res, {
        message: "User not found",
        statusCode: 404,
      });
    }

    return ApiResponse.success(res, {
      data: user.stats,
      message: "User stats retrieved successfully",
    });
  } catch (error) {
    console.error("Get user stats error:", error);
    return ApiResponse.error(res, {
      message: "Failed to retrieve user stats",
      statusCode: 500,
    });
  }
};

/* ================= GET USER UPLOADS ================= */
export const getUserUploads = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const videos = await Video.find({ uploadedBy: userId })
      .populate("course", "title slug")
      .populate("topic", "title")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Video.countDocuments({ uploadedBy: userId });

    return ApiResponse.success(res, {
      data: videos,
      message: "User uploads retrieved successfully",
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get user uploads error:", error);
    return ApiResponse.error(res, {
      message: "Failed to retrieve user uploads",
      statusCode: 500,
    });
  }
};