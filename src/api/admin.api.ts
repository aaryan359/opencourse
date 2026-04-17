import adminClient from "./adminClient";

export const adminApi = {

  login: (email: string, password: string, adminSecret: string) =>
    adminClient.post("/admin/login", { email, password, adminSecret }),


  getDashboard: () => adminClient.get("/admin/dashboard"),


  listFields: () => adminClient.get("/admin/fields"),

  listUsers: (params?: { role?: string; search?: string; page?: number; limit?: number }) =>
    adminClient.get("/admin/users", { params }),
  getUserById: (id: string) => adminClient.get(`/admin/users/${id}`),
  changeUserRole: (id: string, role: string) =>
    adminClient.patch(`/admin/users/${id}/role`, { role }),


  listContributors: (params?: { search?: string; page?: number; limit?: number }) =>
    adminClient.get("/admin/contributors", { params }),


  listApplications: (params?: { status?: string; page?: number; limit?: number }) =>
    adminClient.get("/admin/applications", { params }),
  getApplicationById: (id: string) => adminClient.get(`/admin/applications/${id}`),
  approveApplication: (id: string) =>
    adminClient.patch(`/admin/applications/${id}/approve`),
  rejectApplication: (id: string, reviewNote?: string) =>
    adminClient.patch(`/admin/applications/${id}/reject`, { reviewNote }),


  listVideos: (params?: { status?: string; page?: number; limit?: number }) =>
    adminClient.get("/admin/videos", { params }),
  approveVideo: (id: string) => adminClient.patch(`/admin/videos/${id}/approve`),
  rejectVideo: (id: string, reviewNote: string) =>
    adminClient.patch(`/admin/videos/${id}/reject`, { reviewNote }),
  deleteVideo: (id: string) => adminClient.delete(`/admin/videos/${id}`),


  listCourses: (params?: { published?: string; page?: number; limit?: number }) =>
    adminClient.get("/admin/courses", { params }),
  createCourse: (data: {
    title: string;
    description: string;
    field: string;
    level?: string;
    thumbnail?: string;
    isPublished?: boolean;
  }) => adminClient.post("/admin/courses", data),


  createTopic: (
    courseId: string,
    data: { title: string; description?: string; order?: number }
  ) => adminClient.post(`/admin/courses/${courseId}/topics`, data),


  listInterviewQuestions: (params?: { status?: string; page?: number; limit?: number }) =>
    adminClient.get("/admin/interview-questions", { params }),
  approveInterviewQuestion: (id: string) =>
    adminClient.patch(`/admin/interview-questions/${id}/approve`),
  rejectInterviewQuestion: (id: string, note?: string) =>
    adminClient.patch(`/admin/interview-questions/${id}/reject`, { note }),
};