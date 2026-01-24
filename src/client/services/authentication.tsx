/// <reference types="vite/client" />
import axios from "axios";
import { response } from "express";

export interface IAuthenticationResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface IAuthenticationService {
  login(email: string, password: string): Promise<IAuthenticationResponse>;
  signup(
    email: string,
    password: string,
    confirmPassword: string,
  ): Promise<IAuthenticationResponse>;
  logout(): Promise<IAuthenticationResponse>;
  checkAuth(): Promise<IAuthenticationResponse>;
  forgotPassword(email: string): Promise<IAuthenticationResponse>;
  resetPassword(
    token: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<IAuthenticationResponse>;
  confirmEmail(token: string): Promise<IAuthenticationResponse>;
}

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
  headers: { "Content-Type": "application/json" },
});

export default class AuthenticationService implements IAuthenticationService {
  constructor() {}
  async signup(
    email: string,
    password: string,
    confirmPassword: string,
  ): Promise<IAuthenticationResponse> {
    try {
      const response = await axiosInstance.post("/signup", {
        email,
        password,
        confirmPassword,
      });

      if (response.status === 201) {
        console.log("Signup response data:", response.data);
        return {
          success: true,
          message: "Signup successful",
        };
      }
      return { success: false, error: "Unexpected response status" };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { response } = error;
        if (response.status === 400) {
          console.error("Signup error response:", response.data);
          return {
            success: false,
            error: response.data.message || "Signup failed",
          };
        }

        if (response.status === 500) {
          console.error("Signup server error response:", response.data);
          return {
            success: false,
            error: response.data.errmsg || "Server error during signup",
          };
        }
      }
      return { success: false, error: `Signup failed: ${error}` };
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<IAuthenticationResponse> {
    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      if (response.status === 200) {
        return { success: true, message: "Login successful" };
      }
      return { success: false, error: "Unexpected response status" };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { response } = error;
        if (response.status === 401) {
          return { success: false, message: "Invalid credentials" };
        }
        if (response.status === 403) {
          return { success: false, message: "Email not confirmed" };
        }
        if (response.status === 423) {
          return { success: false, message: "Account locked" };
        }
        if (response.status === 500) {
          return { success: false, error: "Server error during login" };
        }
      }
      return { success: false, error: `Login failed: ${error}` };
    }
  }

  async logout(): Promise<IAuthenticationResponse> {
    try {
      await axiosInstance.post("/logout");
      return { success: true, message: "Logout successful" };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { response } = error;
        if (response.status === 500) {
          return { success: false, error: "Server error during logout" };
        }
      }
      return { success: false, error: `Logout failed: ${error}` };
    }
  }

  async checkAuth(): Promise<IAuthenticationResponse> {
    try {
      const response = await axiosInstance.get("/check");
      return {
        success: true,
        message: "Authenticated",
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { response } = error;
        if (response.status === 401) {
          return { success: false, message: "Not authenticated" };
        }
      }
      return { success: false, error: `Auth check failed: ${error}` };
    }
  }

  async forgotPassword(email: string): Promise<IAuthenticationResponse> {
    try {
      const response = await axiosInstance.post("/forgotpassword", {
        email,
      });
      return {
        success: true,
        message: "Password reset email sent",
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { response } = error;
        if (response.status === 400) {
          return { success: false, error: "Missing token" };
        }

        if (response.status === 500) {
          return {
            success: false,
            error: "Server error during password reset",
          };
        }
      }
      return { success: false, error: `Password reset failed: ${error}` };
    }
  }

  async resetPassword(
    token: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<IAuthenticationResponse> {
    try {
      const response = await axiosInstance.put("/forgotpassword", {
        token,
        newPassword,
        confirmPassword,
      });
      return {
        success: response.status === 200,
        message:
          response.status === 200
            ? "Password reset successful"
            : "Password reset failed",
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { response } = error;
        if (response.status === 400) {
          return { success: false, error: "Missing/Expired token" };
        }
        if (response.status === 422) {
          return { success: false, error: "Passwords do not match" };
        }
        if (response.status === 500) {
          return {
            success: false,
            error: "Server error during password reset",
          };
        }
      }
      return { success: false, error: `Password reset failed: ${error}` };
    }
  }

  async confirmEmail(token: string): Promise<IAuthenticationResponse> {
    try {
      const response = await axiosInstance.post("/confirm-email", {
        token,
      });
      return {
        success: response.status === 200,
        message:
          response.status === 200
            ? "Email confirmed successfully"
            : "Email confirmation failed",
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { response } = error;
        if (response.status === 400) {
          return { success: false, error: "Missing token" };
        }

        if (response.status === 422) {
          return { success: false, error: "Invalid or expired token" };
        }

        if (response.status === 500) {
          return {
            success: false,
            error: "Server error during email confirmation",
          };
        }
      }
      return { success: false, error: `Email confirmation failed: ${error}` };
    }
  }
}
