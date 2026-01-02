import type { Video } from "../../../types/videos.types";


export type MiniTopic = {
  id: string;
  title: string;
  videos: Video[];
};

export type SubTopic = {
  id: string;
  title: string;
  miniTopics: MiniTopic[];
};

export type Course = {
  id: string;
  title: string;
  description: string;
  subtopics: SubTopic[];
};
