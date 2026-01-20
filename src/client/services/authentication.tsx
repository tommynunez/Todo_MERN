import axios from "axios";

export interface IAuthenticationService {
  login(email: string, password: string): Promise<boolean>;
  signup(
    email: string,
    password: string,
    confirmPassword: string,
  ): Promise<boolean>;
  logout(): Promise<void>;
  checkAuth(): Promise<boolean>;
  resetPassword(email: string): Promise<boolean>;
  confirmPasswordReset(
    token: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<boolean>;
  confirmEmail(token: string): Promise<boolean>;
}

export default class AuthenticationService implements IAuthenticationService {
  constructor() {}
  async signup(
    email: string,
    password: string,
    confirmPassword: string,
  ): Promise<boolean> {
    try {
      const response = await axios.post("/api/auth/signup", {
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
          email,
          password,
          confirmPassword,
        }),
      });
      return response.status === 200;
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
