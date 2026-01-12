
export interface IUserProfile {
    firstName?: string;
    lastName?: string;
    avatar?: string;
    bio?: string;
    title?: string;
    skills?: string[];
}

export interface IUserStats {
    totalCourses: number;
    completedCourses: number;
    totalVideosWatched: number;
    totalWatchTime: number;
    uploadedVideos: number;
    level: number;
    xp: number;
}

export interface IUser extends Document {
    email: string;
    password: string;
    username: string;
    profile: IUserProfile;
    stats: IUserStats;
    role: "student" | "instructor" | "admin" | "super_admin";
    comparePassword(candidate: string): Promise<boolean>;
}
