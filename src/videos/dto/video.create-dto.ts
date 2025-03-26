import { Resolutions } from "../types/video";

export type VideoCreateDto = {
  title: string;
  author: string;
  availableResolutions: Resolutions[];
};
