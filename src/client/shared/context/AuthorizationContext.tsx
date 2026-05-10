import React, { createContext, useState } from 'react';
import AuthenticationService from '@/client/features/authentication/services/authentication';

type AuthorizationContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  checkAuthorization: () => Promise<void>;
  signup: (
    email: string,
    password: string,
    confirmPassword: string,
  ) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (
    token: string,
    newPassword: string,
    confirmPassword: string,
  ) => Promise<boolean>;
  confirmEmail: (token: string) => Promise<boolean>;
};

export const AuthorizationContext = createContext<
  AuthorizationContextType | undefined
>(undefined);

export function AuthorizationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authService = new AuthenticationService();

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authService.login(email, password);
      if (response.success) {
        // todo: maybe set a token or something
        console.log('Login successful', response);
        setIsAuthenticated(true);
        return { success: true, message: 'Login successful' };
      }
      setIsAuthenticated(false);
      return { success: false, message: 'Invalid email or password' };
    } catch (error) {
      console.error('Error during login:', error);
      setError(`Login failed. Please try again. ${error}`);
      return { success: false, message: `Login failed. ${error}` };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const response = await authService.logout();
      if (response.success) {
        // todo: maybe set a token or something
        console.log('Logout successful', response);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      setError(`Logout failed. Please try again. ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuthorization = async () => {
    try {
      setIsLoading(true);
      const authResponse = await authService.checkAuth();
      if (authResponse.success) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking authorization:', error);
      setIsAuthenticated(false);
      setError(`Authorization check failed. Please try again. ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    email: string,
    password: string,
    confirmPassword: string,
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authService.signup(
        email,
        password,
        confirmPassword,
      );
      if (response.success) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error during signup:', error);
      setError(`Signup failed. Please try again. ${error}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const response = await authService.forgotPassword(email);
      if (response.success) {
        console.log('Password reset email sent', response);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error during password reset:', error);
      setError(`Password reset failed. Please try again. ${error}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (
    token: string,
    newPassword: string,
    confirmPassword: string,
  ) => {
    try {
      setIsLoading(true);
      const response = await authService.resetPassword(
        token,
        newPassword,
        confirmPassword,
      );
      if (response.success) {
        console.log('Password reset successful', response);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error during password reset:', error);
      setError(`Password reset failed. Please try again. ${error}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const confirmEmail = async (token: string) => {
    try {
      setIsLoading(true);
      const response = await authService.confirmEmail(token);
      if (response.success) {
        console.log('Email confirmation successful', response);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error during email confirmation:', error);
      setError(`Email confirmation failed. Please try again. ${error}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthorizationContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        logout,
        error,
        checkAuthorization,
        signup,
        forgotPassword,
        resetPassword,
        confirmEmail,
      }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
}
