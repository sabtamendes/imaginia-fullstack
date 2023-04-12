import { ApplicationError } from "../protocols";

export function conflictError(message: string): ApplicationError {
  return {
    name: "conflictError",
    message,
  };
}
