import type { Response, Application, Request, NextFunction } from 'express';
import express from 'express';
import path from 'path';

import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import http from 'http';
import ApiResponse from './utils/ApiResponse';

import router from './routes/routes';
import { connectDB } from './config/db';

const app: Application = express();

const REQUEST_BODY_LIMIT = process.env.REQUEST_BODY_LIMIT ?? '2mb';
const TRUST_PROXY_RAW = process.env.TRUST_PROXY ?? '1';

const parseTrustProxy = (value: string): boolean | number => {
    const normalized = value.trim().toLowerCase();

    if (normalized === 'true') return true;
    if (normalized === 'false') return false;

    const asNumber = Number(normalized);
    if (!Number.isNaN(asNumber)) return asNumber;

    return true;
};

app.set('trust proxy', parseTrustProxy(TRUST_PROXY_RAW));

const parseAllowedOrigins = (rawOrigins?: string): string[] => {
    if (!rawOrigins) return [];

    const normalized = rawOrigins.trim();

    // Support JSON array format and simple comma-separated format.
    if (normalized.startsWith('[')) {
        try {
            const parsed = JSON.parse(normalized);
            if (Array.isArray(parsed)) {
                return parsed
                    .map((origin) => String(origin).trim())
                    .filter(Boolean)
                    .map((origin) => origin.replace(/\/+$/, ''));
            }
        } catch {
            // Fall through to comma-separated parsing.
        }
    }

    return normalized
        .split(',')
        .map((origin) => origin.trim().replace(/^['\"]|['\"]$/g, ''))
        .filter(Boolean)
        .map((origin) => origin.replace(/\/+$/, ''));
};

const allowedOrigins = parseAllowedOrigins(process.env.ALLOWED_ORIGINS);

app.use(express.json({ limit: REQUEST_BODY_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: REQUEST_BODY_LIMIT }));
app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));
app.use(helmet());

app.use(
    cors({
        origin: (requestOrigin, callback) => {
            if (!requestOrigin) return callback(null, true);
            const normalizedOrigin = requestOrigin.replace(/\/+$/, '');

            if (allowedOrigins.length === 0 || allowedOrigins.includes(normalizedOrigin)) {
                return callback(null, true);
            }

            return callback(new Error('Not allowed by CORS'));
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    }),
);

app.use(
    '/api/v1',
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 300,
        standardHeaders: true,
        legacyHeaders: false,
    }),
);

app.use('/api/v1', router);

app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
    });
});

app.use((_req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found',
    });
});

app.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
    void next;

    if (
        typeof err === 'object' &&
        err !== null &&
        'type' in err &&
        (err as { type?: string }).type === 'entity.too.large'
    ) {
        return ApiResponse.error(res, {
            statusCode: 413,
            message: `Request payload is too large. Max allowed size is ${REQUEST_BODY_LIMIT}.`,
        });
    }

    const message = err instanceof Error ? err.message : 'Internal Server Error';
    const statusCode =
        typeof err === 'object' &&
        err !== null &&
        'statusCode' in err &&
        typeof (err as { statusCode?: unknown }).statusCode === 'number'
            ? (err as { statusCode: number }).statusCode
            : 500;

    console.error(err);
    return ApiResponse.error(res, {
        message,
        statusCode,
    });
});

const PORT = Number(process.env.PORT) || 3000;

const httpServer = http.createServer(app);

const startServer = async () => {
    await connectDB();
    httpServer.listen(PORT, () => {
        console.log(` HTTP server running on port ${PORT}`);
    });
};

startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
