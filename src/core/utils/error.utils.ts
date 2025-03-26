import { FieldError, APIErrorResult } from "../types/error.types";

export function createErrorMessages(errors: FieldError[]): APIErrorResult {
  return {
    errorsMessages: errors,
  };
}
