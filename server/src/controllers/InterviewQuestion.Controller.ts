import type { Request, Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
import { InterviewQuestion } from "../models/InterviewQuestion";
import type { IInterviewQuestion } from "../types/InterviewQuestion.type";
import ApiResponse from "../utils/ApiResponse";
import mongoose from "mongoose";

/* ================= SUBMIT (PUBLIC / AUTHENTICATED) ================= */
export const submitInterviewQuestions = async (req: Request, res: Response) => {
  try {
    const { company, role, qaPairs, isAnonymous } = req.body;
    const authReq = req as AuthRequest;
    const userId = authReq.user?.userId;

    if (!company || !role || !qaPairs || !Array.isArray(qaPairs) || qaPairs.length === 0) {
      return ApiResponse.error(res, {
        message: "Company, role, and at least one Q&A pair are required",
        statusCode: 400,
      });
    }

    // Validate each QA pair
    for (const pair of qaPairs) {
      if (!pair.question?.trim() || !pair.answer?.trim()) {
        return ApiResponse.error(res, {
          message: "Each Q&A pair must have a question and answer",
          statusCode: 400,
        });
      }
    }

    const createPayload = {
      company: company.trim(),
      role: role.trim(),
      qaPairs,
      isAnonymous: userId ? isAnonymous !== false : true,
      status: "pending" as const,
      ...(userId ? { submittedBy: new mongoose.Types.ObjectId(userId) } : {}),
    };

    const doc = await InterviewQuestion.create(createPayload) as any;

    return ApiResponse.success(res, {
      data: {
        id: doc._id,
        company: doc.company,
        role: doc.role,
        qaPairsCount: doc.qaPairs.length,
        status: doc.status,
        isAnonymous: doc.isAnonymous,
      },
      message: "Interview questions submitted successfully! Under review.",
      statusCode: 201,
    });
  } catch (error) {
    console.error("Submit interview questions error:", error);
    return ApiResponse.error(res, {
      message: "Failed to submit interview questions",
      statusCode: 500,
    });
  }
};

/* ================= LIST APPROVED (PUBLIC) ================= */
export const listInterviewQuestions = async (req: Request, res: Response) => {
  try {
    const { company, role, difficulty, page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const filter: Record<string, unknown> = { status: "approved" };
    if (company) filter.company = new RegExp(company as string, "i");
    if (role) filter.role = new RegExp(role as string, "i");

    let query = InterviewQuestion.find(filter)
      .select("-reviewedBy -reviewNote")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    if (!company && !role) {
      query = query.populate("submittedBy", "username profile.avatar");
    }

    const [questions, total] = await Promise.all([
      query,
      InterviewQuestion.countDocuments(filter),
    ]);

    // Filter by difficulty inside qaPairs if requested
    let result: any[] = questions;
    if (difficulty) {
      result = questions.map((q) => ({
        ...q.toObject(),
        qaPairs: q.qaPairs.filter((p) => p.difficulty === difficulty),
      })).filter((q) => q.qaPairs.length > 0);
    }

    return ApiResponse.success(res, {
      data: result,
      message: "Interview questions retrieved successfully",
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error("List interview questions error:", error);
    return ApiResponse.error(res, {
      message: "Failed to retrieve interview questions",
      statusCode: 500,
    });
  }
};

/* ================= GET DISTINCT COMPANIES (PUBLIC) ================= */
export const getCompanies = async (_req: Request, res: Response) => {
  try {
    const companies = await InterviewQuestion.distinct("company", { status: "approved" });
    return ApiResponse.success(res, { data: companies.sort() });
  } catch {
    return ApiResponse.error(res, { message: "Failed", statusCode: 500 });
  }
};

/* ================= GET DISTINCT ROLES (PUBLIC) ================= */
export const getRoles = async (_req: Request, res: Response) => {
  try {
    const roles = await InterviewQuestion.distinct("role", { status: "approved" });
    return ApiResponse.success(res, { data: roles.sort() });
  } catch {
    return ApiResponse.error(res, { message: "Failed", statusCode: 500 });
  }
};

/* ================= GET BY ID (PUBLIC) ================= */
export const getInterviewQuestionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doc = await InterviewQuestion.findOne({ _id: id, status: "approved" });
    if (!doc) {
      return ApiResponse.error(res, { message: "Not found", statusCode: 404 });
    }
    return ApiResponse.success(res, { data: doc });
  } catch {
    return ApiResponse.error(res, { message: "Failed", statusCode: 500 });
  }
};

/* ================= ADMIN: LIST PENDING ================= */
export const getPendingInterviewQuestions = async (_req: Request, res: Response) => {
  try {
    const docs = await InterviewQuestion.find({ status: "pending" })
      .populate("submittedBy", "username email")
      .sort({ createdAt: 1 });
    return ApiResponse.success(res, { data: docs });
  } catch {
    return ApiResponse.error(res, { message: "Failed", statusCode: 500 });
  }
};

/* ================= ADMIN: APPROVE ================= */
export const approveInterviewQuestion = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const doc = await InterviewQuestion.findByIdAndUpdate(
      id,
      { status: "approved", reviewedBy: req.user?.userId },
      { new: true }
    );
    if (!doc) return ApiResponse.error(res, { message: "Not found", statusCode: 404 });
    return ApiResponse.success(res, { data: doc, message: "Approved" });
  } catch {
    return ApiResponse.error(res, { message: "Failed", statusCode: 500 });
  }
};

/* ================= ADMIN: REJECT ================= */
export const rejectInterviewQuestion = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { note } = req.body;
    const doc = await InterviewQuestion.findByIdAndUpdate(
      id,
      { status: "rejected", reviewedBy: req.user?.userId, reviewNote: note },
      { new: true }
    );
    if (!doc) return ApiResponse.error(res, { message: "Not found", statusCode: 404 });
    return ApiResponse.success(res, { data: doc, message: "Rejected" });
  } catch {
    return ApiResponse.error(res, { message: "Failed", statusCode: 500 });
  }
};
