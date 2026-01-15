import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
import { Field } from "../models/Field";
import ApiResponse from "../utils/ApiResponse";

/* ================= LIST ALL FIELDS (PUBLIC) ================= */
export const listFields = async (req: AuthRequest, res: Response) => {
  try {
    const fields = await Field.find().sort({ name: 1 });

    return ApiResponse.success(res, {
      data: fields,
      message: "Fields retrieved successfully",
    });
  } catch (error) {
    console.error("List fields error:", error);
    return ApiResponse.error(res, {
      message: "Failed to retrieve fields",
      statusCode: 500,
    });
  }
};

/* ================= GET FIELD BY SLUG (PUBLIC) ================= */
export const getFieldBySlug = async (req: AuthRequest, res: Response) => {
  try {
    const { slug } = req.params;

    const field = await Field.findOne({ slug });

    if (!field) {
      return ApiResponse.error(res, {
        message: "Field not found",
        statusCode: 404,
      });
    }

    return ApiResponse.success(res, {
      data: field,
      message: "Field retrieved successfully",
    });
  } catch (error) {
    console.error("Get field error:", error);
    return ApiResponse.error(res, {
      message: "Failed to retrieve field",
      statusCode: 500,
    });
  }
};

/* ================= CREATE FIELD (ADMIN) ================= */
export const createField = async (req: AuthRequest, res: Response) => {
  try {
    const { name, slug, description } = req.body;

    if (!name || !slug) {
      return ApiResponse.error(res, {
        message: "Name and slug are required",
        statusCode: 400,
      });
    }

    const existingField = await Field.findOne({ $or: [{ name }, { slug }] });

    if (existingField) {
      return ApiResponse.error(res, {
        message: "Field with this name or slug already exists",
        statusCode: 409,
      });
    }

    const field = await Field.create({ name, slug, description });

    return ApiResponse.success(res, {
      data: field,
      message: "Field created successfully",
      statusCode: 201,
    });
  } catch (error) {
    console.error("Create field error:", error);
    return ApiResponse.error(res, {
      message: "Failed to create field",
      statusCode: 500,
    });
  }
};

/* ================= UPDATE FIELD (ADMIN) ================= */
export const updateField = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug, description } = req.body;

    const field = await Field.findByIdAndUpdate(
      id,
      { name, slug, description },
      { new: true, runValidators: true }
    );

    if (!field) {
      return ApiResponse.error(res, {
        message: "Field not found",
        statusCode: 404,
      });
    }

    return ApiResponse.success(res, {
      data: field,
      message: "Field updated successfully",
    });
  } catch (error) {
    console.error("Update field error:", error);
    return ApiResponse.error(res, {
      message: "Failed to update field",
      statusCode: 500,
    });
  }
};

/* ================= DELETE FIELD (ADMIN) ================= */
export const deleteField = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const field = await Field.findByIdAndDelete(id);

    if (!field) {
      return ApiResponse.error(res, {
        message: "Field not found",
        statusCode: 404,
      });
    }

    return ApiResponse.success(res, {
      message: "Field deleted successfully",
    });
  } catch (error) {
    console.error("Delete field error:", error);
    return ApiResponse.error(res, {
      message: "Failed to delete field",
      statusCode: 500,
    });
  }
};