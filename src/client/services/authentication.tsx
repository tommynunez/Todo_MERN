import axios from "axios";

interface IAuthenticationResponse {
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
  logout(): Promise<void>;
  checkAuth(): Promise<IAuthenticationResponse>;
  resetPassword(email: string): Promise<IAuthenticationResponse>;
  confirmPasswordReset(
    token: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<IAuthenticationResponse>;
  confirmEmail(token: string): Promise<IAuthenticationResponse>;
}

export default class AuthenticationService implements IAuthenticationService {
  constructor() {}

  async signup(
    email: string,
    password: string,
    confirmPassword: string,
  ): Promise<IAuthenticationResponse> {
    try {
      const response = await axios.post("/api/auth/signup", {
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
          email,
          password,
          confirmPassword,
        }),
      });

      if (response.status === 201) {
        console.log("Signup response data:", response.data);
        return {
          success: true,
          message: "Signup successful",
        };
      }

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
    } catch (error) {
      throw new Error(`Signup failed: ${error}`);
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await axios.post("/api/auth/login", {
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ email, password }),
      });
      return response.status === 200;
    } catch (error) {
      throw new Error(`Login failed: ${error}`);
    }
  }

  async logout(): Promise<void> {
    try {
      await axios.post("/api/auth/logout");
    } catch (error) {
      throw new Error(`Logout failed: ${error}`);
    }
  }

  async checkAuth(): Promise<boolean> {
    try {
      const response = await axios.get("/api/auth/check");
      return response.status === 200;
    } catch (error) {
      throw new Error(`Auth check failed: ${error}`);
    }
  }

  async resetPassword(email: string): Promise<boolean> {
    try {
      const response = await axios.post("/api/auth/reset-password", {
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ email }),
      });
      return response.status === 200;
    } catch (error) {
      throw new Error(`Password reset failed: ${error}`);
    }
  }

  async confirmPasswordReset(
    token: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<boolean> {
    try {
      const response = await axios.post("/api/auth/confirm-reset", {
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ token, newPassword, confirmPassword }),
      });
      return response.status === 200;
    } catch (error) {
      throw new Error(`Password reset confirmation failed: ${error}`);
    }
  }

  async confirmEmail(token: string): Promise<boolean> {
    try {
      const response = await axios.post("/api/auth/confirm-email", {
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ token }),
      });
      return response.status === 200;
    } catch (error) {
      throw new Error(`Email confirmation failed: ${error}`);
    }
  }
}
