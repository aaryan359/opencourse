import apiClient from "./client";

export interface UploadVideoPayload {
  title: string;
  description?: string;
  url: string;
}

export const videosApi = {
  listByCourse: (courseId: string) =>
    apiClient.get(`/courses/${courseId}/videos`),

  listByTopic: (topicId: string) =>
    apiClient.get(`/topics/${topicId}/videos`),

  getById: (id: string) => apiClient.get(`/videos/${id}`),

  upload: (topicId: string, payload: UploadVideoPayload) =>
    apiClient.post(`/topics/${topicId}/videos`, payload),

  getUserVideos: (params?: Record<string, unknown>) =>
    apiClient.get("/users/me/videos", { params }),
};
