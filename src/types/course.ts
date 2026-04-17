export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface CourseField {
  _id: string;
  name: string;
  slug: string;
}

export interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  level: CourseLevel;
  thumbnail?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt?: string;
  field: CourseField;
}

export interface CourseTopicRef {
  _id: string;
  title: string;
  slug?: string;
}

export interface Topic {
  _id: string;
  title: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  course?: CourseTopicRef | string;
}

export type CourseSortOption =
  | 'newest'
  | 'oldest'
  | 'title-asc'
  | 'title-desc'
  | 'level-asc'
  | 'level-desc';
