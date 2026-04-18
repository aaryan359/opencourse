import apiClient from "./client";
import type { ApiEnvelope, Course, Topic } from "../types";


// --------------------
// Fields API
// --------------------
export const fieldsApi = {
  getAllFields: () => {
    return apiClient.get("/course/getfields");
  },

  getFieldBySlug: (slug: string) => {
    return apiClient.get(`/fields/${slug}`);
  },
};


// Courses API
export const coursesApi = {
  getAllCourses: (params?: Record<string, unknown>) => {
    return apiClient.get<ApiEnvelope<Course[]>>("/course/getcourses", {
      params: params,
    });
  },

  getCourseBySlug: (slug: string) => {
    return apiClient.get<ApiEnvelope<Course>>(`/course/getcourse/${slug}`);
  },

  getCoursesByFieldSlug: (fieldSlug: string) => {
    return apiClient.get(`/fields/${fieldSlug}/courses`);
  },

  enrollInCourse: (courseId: string) => {
    return apiClient.post(`/courses/${courseId}/enroll`);
  },

  getTopicsByCourseId: (courseId: string) => {
    return apiClient.get<ApiEnvelope<Topic[]>>(`/topic/courses/${courseId}/topics`);
  },
};