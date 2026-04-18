import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import ApiResponse from '../utils/ApiResponse';
import { User } from '../models/User';

/* ================= TYPES ================= */

interface JwtUserPayload extends JwtPayload {
    userId: string;
}

/* ================= EXTEND REQUEST ================= */

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        role: string;
    };
}

/* ================= AUTH MIDDLEWARE ================= */

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return ApiResponse.error(res, {
                message: 'Authorization header is required',
                statusCode: 401,
            });
        }

        const [scheme, token] = authHeader.split(' ');

        if (scheme !== 'Bearer' || !token) {
            return ApiResponse.error(res, {
                message: 'Invalid authorization format. Use Bearer token',
                statusCode: 401,
            });
        }

        if (!process.env.JWT_SECRET) {
            return ApiResponse.error(res, {
                message: 'JWT secret not configured',
                statusCode: 500,
            });
        }

        let decoded: JwtUserPayload;

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtUserPayload;
        } catch {
            return ApiResponse.error(res, {
                message: 'Invalid or expired token',
                statusCode: 401,
            });
        }

        if (!decoded.userId) {
            return ApiResponse.error(res, {
                message: 'Invalid token payload',
                statusCode: 401,
            });
        }

        const currentUser = await User.findById(decoded.userId).select('role');

        if (!currentUser) {
            return ApiResponse.error(res, {
                message: 'User not found',
                statusCode: 401,
            });
        }

        /* attach minimal user info */
        req.user = {
            userId: decoded.userId,
            // Always trust current DB role; JWT role can be stale after admin approvals.
            role: currentUser.role,
        };

        return next();
    } catch (error) {
        console.error('Auth middleware error:', error);

        return ApiResponse.error(res, {
            message: 'Internal Server Error',
            statusCode: 500,
        });
    }
};
