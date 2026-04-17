import apiClient from "./client";


// --------------------
// Fields API
// --------------------
export const fieldsApi = {
  getAllFields: () => {
    return apiClient.get("/fields");
  },

  getFieldBySlug: (slug: string) => {
    return apiClient.get(`/fields/${slug}`);
  },
};


// Courses API
export const coursesApi = {
  getAllCourses: (params?: Record<string, unknown>) => {
    return apiClient.get("/course/getcourses", {
      params: params,
    });
  },

  getCourseBySlug: (slug: string) => {
    return apiClient.get(`/course/getcourse/${slug}`);
  },

  getCoursesByFieldSlug: (fieldSlug: string) => {
    return apiClient.get(`/fields/${fieldSlug}/courses`);
  },

  enrollInCourse: (courseId: string) => {
    return apiClient.post(`/courses/${courseId}/enroll`);
  },
};