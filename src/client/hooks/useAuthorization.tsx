import { useEffect, useState } from "react";
import AuthenticationService from "../services/authentication";

export const useAuthorization = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthOnMount = async () => {
      await checkAuthorization();
    };
    checkAuthOnMount();
  }, []);

  const authService = new AuthenticationService();

  const signup = async (
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    try {
      setIsLoading(true);
      const response = await authService.signup(
        email,
        password,
        confirmPassword,
      );
      if (response.success) {
        //todo: maybe set a token or something
        console.log("Signup successful", response);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError(`Signup failed. Please try again. ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authService.login(email, password);
      if (response.success) {
        //todo: maybe set a token or something
        console.log("Login successful", response);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError(`Login failed. Please try again. ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const response = await authService.logout();
      if (response.success) {
        //todo: maybe set a token or something
        console.log("Logout successful", response);
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error during logout:", error);
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
      console.error("Error checking authorization:", error);
      setIsAuthenticated(false);
      setError(`Authorization check failed. Please try again. ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const response = await authService.forgotPassword(email);
      if (response.success) {
        console.log("Password reset email sent", response);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error during password reset:", error);
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
        console.log("Password reset successful", response);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error during password reset:", error);
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
        console.log("Email confirmation successful", response);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error during email confirmation:", error);
      setError(`Email confirmation failed. Please try again. ${error}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    signup,
    login,
    logout,
    error,
    checkAuthorization,
    forgotPassword,
    resetPassword,
    confirmEmail,
  };
};
