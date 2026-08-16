/**
 * Mock authentication helpers.
 *
 * There is no backend wired up yet, so these functions simulate the auth API
 * (send OTP, verify OTP, login). They let us build and test the full
 * login → register → OTP flow in the UI. Swap the internals for real API
 * calls once the backend is ready.
 */

export const OTP_LENGTH = 4;

/** Hardcoded code used for every OTP for now. */
export const MOCK_OTP = '0000';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Small artificial delay so the UI can show a realistic loading state. */
const wait = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

/** Basic email format check. */
export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim());
}

/** Simulate sending the 4-digit OTP to an email address. */
export async function sendOtp(email: string): Promise<boolean> {
  await wait();
  return isValidEmail(email);
}

/** Verify an OTP. For now only the hardcoded code passes. */
export async function verifyOtp(email: string, otp: string): Promise<boolean> {
  await wait();
  return isValidEmail(email) && otp === MOCK_OTP;
}

/** Simulate a login attempt. */
export async function login(email: string, password: string): Promise<boolean> {
  await wait();
  return isValidEmail(email) && password.length > 0;
}
