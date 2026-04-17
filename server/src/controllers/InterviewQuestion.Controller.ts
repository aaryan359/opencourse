import type { Request, Response } from 'express';
import type { AuthRequest } from '../middlewares/auth.middleware';
import { InterviewQuestion } from '../models/InterviewQuestion';
import ApiResponse from '../utils/ApiResponse';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

export const submitInterviewQuestions = async (req: Request, res: Response) => {
    try {
        const { company, role, qaPairs, isAnonymous } = req.body;
        const authReq = req as AuthRequest;

        // Attach user when a valid bearer token is present; still allows anonymous/public submission.
        let userId = authReq.user?.userId;
        if (!userId) {
            const authHeader = req.headers.authorization;
            if (authHeader?.startsWith('Bearer ') && process.env.JWT_SECRET) {
                const token = authHeader.split(' ')[1];
                try {
                    const payload = jwt.verify(token, process.env.JWT_SECRET) as {
                        userId?: string;
                    };
                    userId = payload.userId;
                } catch {
                    // ignore invalid token for this public endpoint
                }
            }
        }

        if (!company || !role || !qaPairs || !Array.isArray(qaPairs) || qaPairs.length === 0) {
            return ApiResponse.error(res, {
                message: 'Company, role, and at least one Q&A pair are required',
                statusCode: 400,
            });
        }

        // Validate each QA pair
        for (const pair of qaPairs) {
            if (!pair.question?.trim() || !pair.answer?.trim()) {
                return ApiResponse.error(res, {
                    message: 'Each Q&A pair must have a question and answer',
                    statusCode: 400,
                });
            }
        }

        const createPayload = {
            company: company.trim(),
            role: role.trim(),
            qaPairs,
            isAnonymous: userId ? isAnonymous !== false : true,
            status: 'pending' as const,
            ...(userId ? { submittedBy: new mongoose.Types.ObjectId(userId) } : {}),
        };

        const doc = await InterviewQuestion.create(createPayload);

        return ApiResponse.success(res, {
            data: {
                id: doc._id,
                company: doc.company,
                role: doc.role,
                qaPairsCount: doc.qaPairs.length,
                status: doc.status,
                isAnonymous: doc.isAnonymous,
            },
            message: 'Interview questions submitted successfully! Under review.',
            statusCode: 201,
        });
    } catch (error) {
        console.error('Submit interview questions error:', error);
        return ApiResponse.error(res, {
            message: 'Failed to submit interview questions',
            statusCode: 500,
        });
    }
};

export const listInterviewQuestions = async (req: Request, res: Response) => {
    try {
        const { company, role, difficulty, page = 1, limit = 20 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const difficultyFilter = typeof difficulty === 'string' ? difficulty : undefined;

        const filter: Record<string, unknown> = { status: 'approved' };
        if (company) filter.company = new RegExp(company as string, 'i');
        if (role) filter.role = new RegExp(role as string, 'i');

        let query = InterviewQuestion.find(filter)
            .select('-reviewedBy -reviewNote')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        if (!company && !role) {
            query = query.populate('submittedBy', 'username profile.avatar');
        }

        const [questions, total] = await Promise.all([
            query,
            InterviewQuestion.countDocuments(filter),
        ]);

        // Filter by difficulty inside qaPairs if requested
        const data = difficultyFilter
            ? questions
                  .map((q) => {
                      const obj = q.toObject();
                      return {
                          ...obj,
                          qaPairs: obj.qaPairs.filter((p) => p.difficulty === difficultyFilter),
                      };
                  })
                  .filter((q) => q.qaPairs.length > 0)
            : questions;

        return ApiResponse.success(res, {
            data,
            message: 'Interview questions retrieved successfully',
            meta: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / Number(limit)),
            },
        });
    } catch (error) {
        console.error('List interview questions error:', error);
        return ApiResponse.error(res, {
            message: 'Failed to retrieve interview questions',
            statusCode: 500,
        });
    }
};

export const getCompanies = async (_req: Request, res: Response) => {
    try {
        const companies = await InterviewQuestion.distinct('company', {
            status: 'approved',
        });
        return ApiResponse.success(res, { data: companies.sort() });
    } catch {
        return ApiResponse.error(res, {
            message: 'Failed',
            statusCode: 500,
        });
    }
};

export const getRoles = async (_req: Request, res: Response) => {
    try {
        const roles = await InterviewQuestion.distinct('role', {
            status: 'approved',
        });
        return ApiResponse.success(res, { data: roles.sort() });
    } catch {
        return ApiResponse.error(res, {
            message: 'Failed',
            statusCode: 500,
        });
    }
};

export const getInterviewQuestionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const doc = await InterviewQuestion.findOne({
            _id: id,
            status: 'approved',
        });
        if (!doc) {
            return ApiResponse.error(res, {
                message: 'Not found',
                statusCode: 404,
            });
        }
        return ApiResponse.success(res, { data: doc });
    } catch {
        return ApiResponse.error(res, {
            message: 'Failed',
            statusCode: 500,
        });
    }
};

export const getPendingInterviewQuestions = async (_req: Request, res: Response) => {
    try {
        const docs = await InterviewQuestion.find({ status: 'pending' })
            .populate('submittedBy', 'username email')
            .sort({ createdAt: 1 });
        return ApiResponse.success(res, { data: docs });
    } catch {
        return ApiResponse.error(res, {
            message: 'Failed',
            statusCode: 500,
        });
    }
};

export const getAllInterviewQuestions = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const skip = (page - 1) * limit;
        const status = req.query.status as string | undefined;

        const filter: Record<string, unknown> = {};
        if (status) {
            filter.status = status;
        }

        const [docs, total] = await Promise.all([
            InterviewQuestion.find(filter)
                .populate('submittedBy', 'username email role')
                .populate('reviewedBy', 'username')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            InterviewQuestion.countDocuments(filter),
        ]);

        return ApiResponse.success(res, {
            data: docs,
            message: 'Interview questions retrieved successfully',
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch {
        return ApiResponse.error(res, {
            message: 'Failed',
            statusCode: 500,
        });
    }
};

export const approveInterviewQuestion = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const doc = await InterviewQuestion.findByIdAndUpdate(
            id,
            { status: 'approved', reviewedBy: req.user?.userId },
            { new: true },
        );
        if (!doc)
            return ApiResponse.error(res, {
                message: 'Not found',
                statusCode: 404,
            });
        return ApiResponse.success(res, { data: doc, message: 'Approved' });
    } catch {
        return ApiResponse.error(res, {
            message: 'Failed',
            statusCode: 500,
        });
    }
};

export const rejectInterviewQuestion = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { note } = req.body;
        const doc = await InterviewQuestion.findByIdAndUpdate(
            id,
            {
                status: 'rejected',
                reviewedBy: req.user?.userId,
                reviewNote: note,
            },
            { new: true },
        );
        if (!doc)
            return ApiResponse.error(res, {
                message: 'Not found',
                statusCode: 404,
            });
        return ApiResponse.success(res, { data: doc, message: 'Rejected' });
    } catch {
        return ApiResponse.error(res, {
            message: 'Failed',
            statusCode: 500,
        });
    }
};
