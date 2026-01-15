import type { Response, NextFunction } from "express";
import type { AuthRequest } from "./auth.middleware";
import ApiResponse from "../utils/ApiResponse";

/* ================= ROLE AUTHORIZATION MIDDLEWARE ================= */

export const requireRole = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    const userRole = req.user?.role;

    if (!userRole) {
      ApiResponse.error(res, {
        message: "User role not found",
        statusCode: 403,
      });
      return;
    }

    if (!allowedRoles.includes(userRole)) {
      ApiResponse.error(res, {
        message: "You do not have permission to access this resource",
        statusCode: 403,
      });
      return;
    }

    next();
  };
};

/* ================= SPECIFIC ROLE MIDDLEWARES ================= */

export const requireAdmin = requireRole("admin", "super_admin");

export const requireInstructor = requireRole(
  "instructor",
  "admin",
  "super_admin"
);

export const requireSuperAdmin = requireRole("super_admin");