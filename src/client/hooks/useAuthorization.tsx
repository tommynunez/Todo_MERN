import { useState } from "react";
import AuthenticationService from "../services/authentication";

export const useAuthorization = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const authService = new AuthenticationService();

  const signup = async (
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    try {
      const response = await authService.signup(
        email,
        password,
        confirmPassword,
      );
      if (response) {
        //todo: maybe set a token or something
        console.log("Signup successful", response);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError(`Signup failed. Please try again. ${error}`);
    }
  };

  const checkAuthorization = async () => {
    try {
      const authResponse = await authService.checkAuth();

      if (authResponse) {
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
  return { isAuthenticated, isLoading, signup, checkAuthorization };
};
