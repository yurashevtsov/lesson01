import { VideoUpdateDto } from "../dto/video.update-dto";
import { FieldError } from "../../core/types/error.types";
import { Resolutions } from "../types/video";
import { isValidDateTime } from "../../core/utils/helpers";

/*
title
author
availableResolutions
canBeDownloaded
minAgeRestriction
publicationDate
*/

export function videoUpdateDtoValidation(data: VideoUpdateDto): FieldError[] {
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

  if (typeof data.canBeDownloaded !== "boolean") {
    errors.push({
      field: "canBeDownloaded",
      message: "Invalid canBeDownloaded. Must be true or false",
    });
  }

  if (data.minAgeRestriction !== null) {
    if (
      !Number.isFinite(data.minAgeRestriction) ||
      data.minAgeRestriction < 1 ||
      data.minAgeRestriction > 18
    ) {
      errors.push({
        field: "minAgeRestriction",
        message:
          "Invalid minAgeRestriction. Must be greater than 1 and less than 18 or null",
      });
    }
  }

  if (!data.publicationDate) {
    errors.push({
      field: "publicationDate",
      message: "Invalid publicationDate. Must not be empty",
    });
  } else {
    if (
      typeof data.publicationDate !== "string" ||
      !isValidDateTime(data.publicationDate)
    ) {
      errors.push({
        field: "publicationDate",
        message: "Invalid publicationDate. Must be a string $date-time format",
      });
    }
  }

  return errors;
}
