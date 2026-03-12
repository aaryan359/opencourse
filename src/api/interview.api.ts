import apiClient from "./client";

export interface QAPair {
  question: string;
  answer: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface SubmitInterviewPayload {
  company: string;
  role: string;
  qaPairs: QAPair[];
  isAnonymous?: boolean;
}

export const interviewApi = {
  submit: (payload: SubmitInterviewPayload) =>
    apiClient.post("/interview-questions", payload),

  list: (params?: Record<string, unknown>) =>
    apiClient.get("/interview-questions", { params }),

  getById: (id: string) => apiClient.get(`/interview-questions/${id}`),

  getCompanies: () => apiClient.get("/interview-questions/companies"),

  getRoles: () => apiClient.get("/interview-questions/roles"),
};
