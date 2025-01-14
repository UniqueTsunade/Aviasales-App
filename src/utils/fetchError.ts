import { SerializedError } from "@reduxjs/toolkit";

export const serializedError = (error: unknown): SerializedError => {
  const err = error as Error & { response?: { data: string }; code?: string; config?: { url?: string } };

  let message = "Unknown error";

  // Обработка сетевых ошибок
  if (err.code === "ECONNREFUSED" || err.code === "ENOTFOUND") {
    message = "Network error: Unable to connect to the server";
  }
  // Обработка ошибок axios
  else if (err.response) {
    // Если ответ содержит HTML, извлекаем текст ошибки из <pre>
    if (err.response.data.startsWith("<!DOCTYPE html>")) {
      const match = err.response.data.match(/<pre>(.*?)<\/pre>/);
      message = match ? match[1] : "Server returned an HTML error page";
    }
    // Если ответ содержит JSON или текстовое сообщение
    else {
      message = err.response.data || "Request failed";
    }
  }
  // Обработка ошибок с неправильным URL
  else if (err.message.includes("Invalid URL")) {
    message = "Invalid URL: Please check the API endpoint";
  }
  // Обработка стандартных ошибок
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