import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IField extends Document {
    name: string;
    slug: string;
    description?: string;
}

const FieldSchema = new Schema<IField>(
    {
        name: { type: String, required: true, trim: true },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        description: { type: String, trim: true },
    },
    { timestamps: true },
);

export const Field: Model<IField> = mongoose.model<IField>('Field', FieldSchema);
