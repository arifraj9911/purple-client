import apiClient from '@/lib/axios';
import type {
  RegisterDto,
  LoginDto,
  VerifyOtpDto,
  ResendOtpDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  User,
  LoginResponse,
  AuthTokens,
  StandardApiResponse,
} from '@/types/auth.types';

export const authService = {
  /**
   * Register a new user account
   */
  async register(dto: RegisterDto): Promise<{ message: string }> {
    const response: any = await apiClient.post('/auth/register', dto);
    return response?.data ?? response;
  },

  /**
   * Login with email and password
   */
  async login(dto: LoginDto): Promise<LoginResponse> {
    const response: any = await apiClient.post('/auth/login', dto);
    return response?.data ?? response;
  },

  /**
   * Verify email OTP or password reset OTP
   */
  async verifyOtp(dto: VerifyOtpDto): Promise<{ message: string }> {
    const response: any = await apiClient.post('/auth/verify-otp', dto);
    return response?.data ?? response;
  },

  /**
   * Resend OTP with cooldown
   */
  async resendOtp(dto: ResendOtpDto): Promise<{ message: string }> {
    const response: any = await apiClient.post('/auth/resend-otp', dto);
    return response?.data ?? response;
  },

  /**
   * Request password reset code
   */
  async forgotPassword(dto: ForgotPasswordDto): Promise<{ message: string }> {
    const response: any = await apiClient.post('/auth/forgot-password', dto);
    return response?.data ?? response;
  },

  /**
   * Confirm password reset
   */
  async resetPassword(dto: ResetPasswordDto): Promise<{ message: string }> {
    const response: any = await apiClient.post('/auth/reset-password', dto);
    return response?.data ?? response;
  },

  /**
   * Rotate access/refresh tokens
   */
  async refreshTokens(): Promise<AuthTokens> {
    const response: any = await apiClient.post('/auth/refresh');
    return response?.data ?? response;
  },

  /**
   * Invalidate active session and cookies
   */
  async logout(): Promise<{ message: string }> {
    const response: any = await apiClient.post('/auth/logout');
    return response?.data ?? response;
  },

  /**
   * Retrieve current authenticated user profile
   */
  async getProfile(): Promise<User> {
    const response: any = await apiClient.get('/auth/me');
    return response?.data ?? response;
  },
};
