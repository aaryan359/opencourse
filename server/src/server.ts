import type { Response, Application, Request, NextFunction } from "express";
import express from 'express'

import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import http from "http";
import ApiResponse from "./utils/ApiResponse";


import router from "./routes/routes";
import { connectDB } from "./config/db";



const app: Application = express();



app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(helmet());




app.use(
    cors({
        origin: process.env.ALLOWED_ORIGINS
            ? process.env.ALLOWED_ORIGINS.split(",")
            : "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    })
);




app.use(
    "/api/v1",
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 300,
        standardHeaders: true,
        legacyHeaders: false,
    })
);





app.use("/api/v1", router);






app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({
        status: "healthy",
        timestamp: new Date().toISOString(),
    });
});





app.use((_req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Endpoint not found",
    });
});




app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    return ApiResponse.error(res, {
        message: err.message || "Internal Server Error",
        statusCode: err.statusCode || 500,
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
    console.error("Failed to start server:", error);
    process.exit(1);
});