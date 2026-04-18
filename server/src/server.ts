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

app.use(express.json({ limit: REQUEST_BODY_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: REQUEST_BODY_LIMIT }));
app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));
app.use(helmet());

app.use(
    cors({
        origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
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
