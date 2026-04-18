import apiClient from "./client";
import type { ApiEnvelope, Video } from "@/types";

export interface UploadVideoPayload {
  title: string;
  description?: string;
  url?: string;
  duration?: number;
}

export const videosApi = {
  listByCourse: (courseId: string) =>
    apiClient.get<ApiEnvelope<Video[]>>(`/video/courses/${courseId}/videos`),

  listByTopic: (topicId: string) =>
    apiClient.get<ApiEnvelope<Video[]>>(`/video/topics/${topicId}/videos`),

  getById: (id: string) => apiClient.get<ApiEnvelope<Video>>(`/video/videos/${id}`),

  upload: (topicId: string, payload: UploadVideoPayload) =>
    apiClient.post<ApiEnvelope<Video>>(`/video/topics/${topicId}/videos`, payload),

  getUserVideos: (params?: Record<string, unknown>) =>
    apiClient.get<ApiEnvelope<Video[]>>('/video/users/me/videos', { params }),

};
