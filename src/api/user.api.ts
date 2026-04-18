import apiClient from './client';
import type {
  ApiEnvelope,
  AuthUser,
  ChangePasswordPayload,
  DashboardStats,
  UpdateProfilePayload,
  UserUploadItem,
} from '@/types';

export const userApi = {
  updateMyProfile: (payload: UpdateProfilePayload) =>
    apiClient.put<ApiEnvelope<AuthUser>>('/user/users/me', payload),

  changeMyPassword: (payload: ChangePasswordPayload) =>
    apiClient.put<ApiEnvelope<null>>('/user/users/me/password', payload),

  getMyStats: () => apiClient.get<ApiEnvelope<DashboardStats>>('/user/users/me/stats'),

  getMyUploads: (params?: Record<string, unknown>) =>
    apiClient.get<ApiEnvelope<UserUploadItem[]>>('/user/users/me/uploads', { params }),
};
