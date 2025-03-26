import { Resolutions, Video } from "../videos/types/video";

const db = {
  videos: <Video[]>[
    {
      id: 0,
      title: "super title",
      author: "great guy",
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: "2025-03-26T05:40:56.653Z",
      publicationDate: "2025-03-26T05:40:56.653Z",
      availableResolutions: [Resolutions.P144, Resolutions.P240],
    },
    {
      id: 1,
      title: "boring title",
      author: "boring author",
      canBeDownloaded: false,
      minAgeRestriction: 16,
      createdAt: "2024-03-26T05:40:56.653Z",
      publicationDate: "2024-03-27T05:40:56.653Z",
      availableResolutions: [
        Resolutions.P144,
        Resolutions.P240,
        Resolutions.P360,
      ],
    },
  ],
};

export { db };
