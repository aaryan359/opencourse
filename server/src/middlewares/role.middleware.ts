import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '../middlewares/auth.middleware';
import ApiResponse from '../utils/ApiResponse';

/**
 * Generic role guard — pass one or more allowed roles.
 * Must come AFTER authMiddleware (which attaches req.user).
 */
export const requireRole = (...allowedRoles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        const userRole = req.user?.role;

        if (!userRole) {
            ApiResponse.error(res, {
                message: 'Unauthorized',
                statusCode: 401,
            });
            return;
        }

        if (!allowedRoles.includes(userRole)) {
            ApiResponse.error(res, {
                message: 'You do not have permission to access this resource',
                statusCode: 403,
            });
            return;
        }

        next();
    };
};

/** Only admin accounts */
export const requireAdmin = requireRole('admin');

/** Contributors AND admins (admin can do anything a contributor can) */
export const requireContributor = requireRole('contributor', 'admin');

/** Alias kept for existing routes that use requireInstructor */
export const requireInstructor = requireContributor;
