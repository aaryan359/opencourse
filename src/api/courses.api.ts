import apiClient from "./client";

export const fieldsApi = {
  listFields: () => apiClient.get("/fields"),
  getFieldBySlug: (slug: string) => apiClient.get(`/fields/${slug}`),
};

export const coursesApi = {
  listCourses: (params?: Record<string, unknown>) =>
    apiClient.get("/courses", { params }),
  getCourseBySlug: (slug: string) => apiClient.get(`/courses/${slug}`),
  getCoursesByField: (fieldSlug: string) =>
    apiClient.get(`/fields/${fieldSlug}/courses`),
  enrollInCourse: (courseId: string) =>
    apiClient.post(`/courses/${courseId}/enroll`),
};

export const topicsApi = {
  listTopicsByCourse: (courseId: string) =>
    apiClient.get(`/courses/${courseId}/topics`),
  getTopicById: (id: string) => apiClient.get(`/topics/${id}`),
};

export const videosApi2 = {
  listByTopic: (topicId: string) => apiClient.get(`/topics/${topicId}/videos`),
  listByCourse: (courseId: string) => apiClient.get(`/courses/${courseId}/videos`),
  getById: (id: string) => apiClient.get(`/videos/${id}`),
};

export const searchApi = {
  global: (q: string) => apiClient.get("/search", { params: { q } }),
  courses: (params: Record<string, unknown>) =>
    apiClient.get("/search/courses", { params }),
  trending: () => apiClient.get("/trending"),
};

export const enrollmentApi = {
  getUserEnrollments: () => apiClient.get("/users/me/enrollments"),
  getProgress: (courseId: string) =>
    apiClient.get(`/enrollments/${courseId}`),
  updateProgress: (courseId: string, data: Record<string, unknown>) =>
    apiClient.patch(`/enrollments/${courseId}/progress`, data),
};

export const userApi = {
  getStats: () => apiClient.get("/users/me/stats"),
  getUploads: (page = 1, limit = 10) =>
    apiClient.get("/users/me/uploads", { params: { page, limit } }),
  getEnrollments: () => apiClient.get("/users/me/enrollments"),
};
