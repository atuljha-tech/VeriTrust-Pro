// lib/apiResponse.js

export function successResponse(message, data = null) {
  return {
    success: true,
    message,
    data,
    error: null
  };
}

export function errorResponse(message, error = null) {
  return {
    success: false,
    message,
    data: null,
    error
  };
}
