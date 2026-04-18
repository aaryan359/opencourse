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
    apiClient.post("/interview/submit", payload),

  list: (params?: Record<string, unknown>) =>
    apiClient.get("/interview", { params }),

  getById: (id: string) => apiClient.get(`/interview/getquestions/${id}`),

  getCompanies: () => apiClient.get("/interview/companies"),

  getRoles: () => apiClient.get("/interview/roles"),
};
