import type { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import ApiResponse from '../utils/ApiResponse';

const UPLOAD_ROOT = path.resolve(process.cwd(), 'uploads', 'videos');

if (!fs.existsSync(UPLOAD_ROOT)) {
    fs.mkdirSync(UPLOAD_ROOT, { recursive: true });
}

export const MAX_VIDEO_FILE_SIZE_MB = Number(process.env.MAX_VIDEO_FILE_SIZE_MB) || 200;
export const MAX_VIDEO_FILE_SIZE_BYTES = MAX_VIDEO_FILE_SIZE_MB * 1024 * 1024;
export const MAX_VIDEO_DURATION_SECONDS = Number(process.env.MAX_VIDEO_DURATION_SECONDS) || 3600;

const ALLOWED_VIDEO_MIME_TYPES = new Set([
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/quicktime',
    'video/x-matroska',
]);

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, UPLOAD_ROOT);
    },
    filename: (_req, file, cb) => {
        const safeBase = file.originalname
            .toLowerCase()
            .replace(/[^a-z0-9.\-_]/g, '-')
            .replace(/-+/g, '-')
            .slice(0, 80);

        const extension = path.extname(safeBase) || '.mp4';
        const base = path.basename(safeBase, extension) || 'video';
        cb(null, `${Date.now()}-${base}${extension}`);
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: MAX_VIDEO_FILE_SIZE_BYTES,
        files: 1,
    },
    fileFilter: (_req, file, cb) => {
        if (!ALLOWED_VIDEO_MIME_TYPES.has(file.mimetype)) {
            cb(new Error('Unsupported video file type. Use MP4, WebM, OGG, MOV, or MKV.'));
            return;
        }
        cb(null, true);
    },
});

export const uploadVideoFile = (req: Request, res: Response, next: NextFunction): void => {
    upload.single('videoFile')(req, res, (err: unknown) => {
        if (!err) {
            next();
            return;
        }

        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                ApiResponse.error(res, {
                    message: `Video file is too large. Max size is ${MAX_VIDEO_FILE_SIZE_MB}MB.`,
                    statusCode: 413,
                });
                return;
            }

            ApiResponse.error(res, {
                message: 'Invalid file upload request.',
                statusCode: 400,
            });
            return;
        }

        ApiResponse.error(res, {
            message: err instanceof Error ? err.message : 'Video upload failed.',
            statusCode: 400,
        });
    });
};
