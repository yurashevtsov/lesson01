import { Resolutions } from "../types/video";

export type VideoUpdateDto = {
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: number | null;
  publicationDate: string;
  availableResolutions: Resolutions[]; // array of strings with specific values specified in Resolutions
};

// import { Video } from "../types/video";
// export type VideoUpdateDto = Omit<Video, "id" | "createdAt">;
