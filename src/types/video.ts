export type VideoStatus = 'pending' | 'approved' | 'rejected';

export interface Video {
  _id: string;
  title: string;
  description?: string;
  url: string;
  sourceType?: 'url' | 'file';
  mimeType?: string;
  fileSize?: number;
  duration?: number;
  thumbnail?: string;
  tags?: string[];
  status?: VideoStatus;
  views?: number;
  rating?: number;
  reviewNote?: string;
  createdAt?: string;
  updatedAt?: string;
}
