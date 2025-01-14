import { SerializedError } from "@reduxjs/toolkit";

export const serializedError = (error: unknown): SerializedError => {
  const err = error as Error & {
    response?: { data: string };
    code?: string;
    config?: { url?: string };
  };

  let message = "Unknown error";

  // Handling network errors
  if (err.code === "ECONNREFUSED" || err.code === "ENOTFOUND") {
    message = "Network error: Unable to connect to the server";
  }
  // axios error handling
  else if (err.response) {
    if (err.response.data.startsWith("<!DOCTYPE html>")) {
      const match = err.response.data.match(/<pre>(.*?)<\/pre>/);
      message = match ? match[1] : "Server returned an HTML error page";
    }
    else {
      message = err.response.data || "Request failed";
    }
  }
  // Handling errors with invalid URL
  else if (err.message.includes("Invalid URL")) {
    message = "Invalid URL: Please check the API endpoint";
  }
  // Handling standard errors
  else {
    message = err.message || "Unknown error";
  }

  return {
    name: err.name || "UnknownError",
    message,
    stack: err.stack || "",
    code: err.code || "",
  };
};
