import { SerializedError } from "@reduxjs/toolkit";

export const serializedError = (error: unknown): SerializedError => {
  return {
    name: (error as Error).name || "UnknownError",
    message:
      (error as { response?: { data: string } }).response?.data ||
      (error as Error).message ||
      "Unknown error",
    stack: (error as Error).stack || "",
    code: (error as { code?: string }).code || "",
  };
};
