import { VideoCreateDto } from "../dto/video.create-dto";
import { FieldError } from "../../core/types/error.types";
import { Resolutions } from "../types/video";

export function validateVideoCreateDto(data: VideoCreateDto): FieldError[] {
  const errors: FieldError[] = [];

  if (
    !data.title ||
    typeof data.title !== "string" ||
    data.title.trim().length === 0 ||
    data.title.length > 40
  ) {
    errors.push({
      field: "title",
      message: "Invalid title",
    });
  }

  if (
    !data.author ||
    typeof data.author !== "string" ||
    data.author.trim().length === 0 ||
    data.author.length > 20
  ) {
    errors.push({
      field: "author",
      message: "Invalid author",
    });
  }

  if (!data.availableResolutions.length) {
    errors.push({
      field: "availableResolutions",
      message: "Invalid availableResolutions. Must have at least 1 resolution.",
    });
  } else {
    const allowedResolutions = Object.values(Resolutions);
    for (let resolution of data.availableResolutions) {
      if (!allowedResolutions.includes(resolution as Resolutions)) {
        errors.push({
          field: "availableResolutions",
          message:
            "Invalid availableResolutions. Allowed resolutions are P144, P240, P360, P480, P720, P1080, P1440, P2160",
        });
        break;
      }
    }
  }

  return errors;
}
