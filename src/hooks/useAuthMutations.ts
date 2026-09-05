import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import { showApiError, showApiSuccess } from '@/lib/toast';
import type {
  RegisterDto,
  LoginDto,
  VerifyOtpDto,
  ResendOtpDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from '@/types/auth.types';

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (dto: RegisterDto) => authService.register(dto),
    onSuccess: (data) => {
      showApiSuccess(data.message || 'Registration successful! Verification code sent to your email.');
    },
    onError: (error) => {
      showApiError(error, 'Registration failed. Please try again.');
    },
  });
}

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (dto: LoginDto) => authService.login(dto),
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
      queryClient.setQueryData(['currentUser'], data.user);
      const name = data.user.fullName || data.user.email.split('@')[0];
      showApiSuccess(`Welcome back, ${name}!`);
    },
    onError: (error) => {
      showApiError(error, 'Invalid email or password.');
    },
  });
}

export function useVerifyOtpMutation() {
  return useMutation({
    mutationFn: (dto: VerifyOtpDto) => authService.verifyOtp(dto),
    onSuccess: (data) => {
      showApiSuccess(data.message || 'OTP verified successfully.');
    },
    onError: (error) => {
      showApiError(error, 'Verification failed. Please check your code.');
    },
  });
}

export function useResendOtpMutation() {
  return useMutation({
    mutationFn: (dto: ResendOtpDto) => authService.resendOtp(dto),
    onSuccess: (data) => {
      showApiSuccess(data.message || 'A new verification code has been dispatched.');
    },
    onError: (error) => {
      showApiError(error, 'Could not resend OTP. Please try again shortly.');
    },
  });
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: (dto: ForgotPasswordDto) => authService.forgotPassword(dto),
    onSuccess: (data) => {
      showApiSuccess(data.message || 'Password reset OTP dispatched to your email.');
    },
    onError: (error) => {
      showApiError(error, 'Failed to request password reset.');
    },
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: (dto: ResetPasswordDto) => authService.resetPassword(dto),
    onSuccess: (data) => {
      showApiSuccess(data.message || 'Password reset successfully! Please log in with your new password.');
    },
    onError: (error) => {
      showApiError(error, 'Failed to reset password. Please verify the code.');
    },
  });
}

export function useLogoutMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      showApiSuccess('Logged out successfully.');
      router.push('/login');
    },
    onError: () => {
      // Even if server session invalidation encounters network issue, clear client store
      clearAuth();
      queryClient.clear();
      router.push('/login');
    },
  });
}
