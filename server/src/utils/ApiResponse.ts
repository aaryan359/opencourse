import type { ErrorOptions, SuccessOptions } from '../types/ApiResponse.type';
import type { Response } from 'express';

class ApiResponse {
    static success<T>(res: Response, options: SuccessOptions<T> = {}): Response {
        const { data = null, message = 'Success', statusCode = 200, meta } = options;

        const response: {
            success: true;
            message: string;
            data: T | null;
            meta?: Record<string, unknown>;
        } = {
            success: true,
            message,
            data,
        };

        if (meta) {
            response.meta = meta;
        }

        return res.status(statusCode).json(response);
    }

    static error(res: Response, options: ErrorOptions = {}): Response {
        const {
            error = 'Internal Server Error',
            message = 'An error occurred',
            statusCode = 500,
            details,
        } = options;

        const response: {
            success: false;
            error: string;
            message: string;
            details?: unknown;
        } = {
            success: false,
            error,
            message,
        };

        if (details && process.env.NODE_ENV !== 'production') {
            response.details = details;
        }

        return res.status(statusCode).json(response);
    }
}

export default ApiResponse;
