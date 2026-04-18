import apiClient from './client';
import type {
  ApiEnvelope,
  CreateTopicPayload,
  ContributorApplication,
  ContributorApplicationPayload,
  InterviewSubmissionResult,
  Topic,
  UploadTopicContributionPayload,
  SubmitInterviewPayload,
} from '@/types';

export const contributeApi = {
  getMyApplication: () =>
    apiClient.get<ApiEnvelope<ContributorApplication | null>>(
      '/user/contributor-application/me',
    ),

  applyForContributor: (payload: ContributorApplicationPayload) =>
    apiClient.post<ApiEnvelope<ContributorApplication>>(
      '/user/contributor-application',
      payload,
    ),

  getTopicsByCourseId: (courseId: string) =>
    apiClient.get<ApiEnvelope<Topic[]>>(`/topic/courses/${courseId}/topics`),

  createTopic: (courseId: string, payload: CreateTopicPayload) =>
    apiClient.post<ApiEnvelope<Topic>>(`/topic/courses/${courseId}/topics`, payload),

  uploadTopicContribution: (topicId: string, payload: UploadTopicContributionPayload) =>
    {
      const formData = new FormData();
      formData.append('title', payload.title);

      if (payload.description) {
        formData.append('description', payload.description);
      }

      if (payload.url) {
        formData.append('url', payload.url);
      }

      if (typeof payload.duration === 'number' && Number.isFinite(payload.duration)) {
        formData.append('duration', String(payload.duration));
      }

      if (payload.videoFile) {
        formData.append('videoFile', payload.videoFile);
      }

      return apiClient.post<ApiEnvelope<unknown>>(`/video/topics/${topicId}/videos`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (event) => {
          if (!payload.onUploadProgress) return;
          const total = event.total ?? 0;
          if (total <= 0) return;
          const progress = Math.round((event.loaded * 100) / total);
          payload.onUploadProgress(progress);
        },
      });
    },

  submitInterviewQuestions: (payload: SubmitInterviewPayload) =>
    apiClient.post<ApiEnvelope<InterviewSubmissionResult>>('/interview/submit', payload),
};
