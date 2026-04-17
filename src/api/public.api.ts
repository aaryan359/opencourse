import apiClient from "./client";

export const publicApi = {
  // Fields
  listFields: () => apiClient.get("/fields"),

  // Courses — supports ?field=<fieldId>&level=<level>
  listCourses: (params?: { field?: string; level?: string; page?: number; limit?: number }) =>
    apiClient.get("/courses", { params }),

  getCourseBySlug: (slug: string) => apiClient.get(`/courses/${slug}`),

  // Topics
  listTopics: (courseId: string) => apiClient.get(`/courses/${courseId}/topics`),

  // Videos
  listVideos: (topicId: string) => apiClient.get(`/topics/${topicId}/videos`),
};
