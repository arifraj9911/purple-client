import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

/**
 * Extracts a human-friendly error message from a NestJS API response or Axios error.
 */
export function extractErrorMessage(error: unknown, fallbackMessage = 'An unexpected error occurred. Please try again.'): string {
  if (!error) return fallbackMessage;

  // If it's an AxiosError
  if (typeof error === 'object' && error !== null && 'isAxiosError' in error) {
    const axiosError = error as AxiosError<any>;

    if (!axiosError.response) {
      if (axiosError.code === 'ERR_NETWORK' || axiosError.message?.includes('Network Error')) {
        return 'Cannot connect to server. Please check your internet or verify backend is running on http://localhost:4000.';
      }
      return axiosError.message || fallbackMessage;
    }

    const data = axiosError.response.data;

    // 1. NestJS class-validator errors: array of strings
    if (data?.message && Array.isArray(data.message)) {
      return data.message.join('. ');
    }

    // 2. Standard NestJS string message
    if (typeof data?.message === 'string' && data.message.trim().length > 0) {
      return data.message;
    }

    // 3. Fallback error field in response
    if (typeof data?.error === 'string' && data.error.trim().length > 0) {
      return data.error;
    }

    // 4. HTTP status code specific fallbacks
    switch (axiosError.response.status) {
      case 400:
        return 'Bad request. Please verify your inputs.';
      case 401:
        return 'Invalid credentials or your session has expired.';
      case 403:
        return 'Access forbidden. Please verify your email or check account lockout.';
      case 404:
        return 'The requested resource was not found.';
      case 409:
        return 'An account with this email already exists.';
      case 429:
        return 'Too many requests. Please wait a few minutes before trying again.';
      case 500:
      default:
        return 'Internal server error. Please try again later.';
    }
  }

  // Standard JavaScript Error
  if (error instanceof Error) {
    return error.message;
  }

  // String error
  if (typeof error === 'string') {
    return error;
  }

  return fallbackMessage;
}

/**
 * Displays a styled error toast notification and returns the message for inline display.
 */
export function showApiError(error: unknown, fallbackMessage?: string): string {
  const message = extractErrorMessage(error, fallbackMessage);

  toast.error(message, {
    duration: 5000,
    style: {
      borderRadius: '12px',
      background: '#1F2937',
      color: '#FFFFFF',
      fontSize: '14px',
      padding: '12px 16px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
    },
    iconTheme: {
      primary: '#EF4444',
      secondary: '#FFFFFF',
    },
  });

  return message;
}

/**
 * Displays a styled success toast notification.
 */
export function showApiSuccess(message: string) {
  toast.success(message, {
    duration: 4000,
    style: {
      borderRadius: '12px',
      background: '#1F2937',
      color: '#FFFFFF',
      fontSize: '14px',
      padding: '12px 16px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(34, 197, 94, 0.3)',
    },
    iconTheme: {
      primary: '#22C55E',
      secondary: '#FFFFFF',
    },
  });
}
