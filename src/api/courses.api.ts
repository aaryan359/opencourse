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









