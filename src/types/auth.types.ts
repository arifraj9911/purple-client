export type Provider = 'LOCAL' | 'GOOGLE';

export type OtpPurpose = 'EMAIL_VERIFICATION' | 'PASSWORD_RESET';

export interface User {
  id: string;
  email: string;
  fullName?: string | null;
  isVerified: boolean;
  provider: Provider;
  googleId?: string | null;
  failedLoginCount?: number;
  lockedUntil?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface StandardApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse extends AuthTokens {
  user: User;
}

export interface RegisterDto {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface VerifyOtpDto {
  email: string;
  code: string;
  purpose: OtpPurpose;
}

export interface ResendOtpDto {
  email: string;
  purpose: OtpPurpose;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  email: string;
  otp: string;
  newPassword: string;
}
