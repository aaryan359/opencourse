import mongoose, { Schema, Document, Model } from "mongoose";
import type { IField } from "../types/Field.type.js";



const FieldSchema = new Schema<IField>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: String,
  },
  { timestamps: true }
);

export const Field: Model<IField> = mongoose.model<IField>("Field", FieldSchema);
