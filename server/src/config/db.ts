import 'dotenv/config';
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined in environment variables');
}

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);

        console.log(` MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
