import { Form } from "./login-form";
import { usePreventBackButton } from "@hooks/usePreventBackButton";

export const Login = () => {
  usePreventBackButton();
  return (
    <div className="min-h-screen bg-white dark:bg-ms-dark-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="space-y-8">
          {/* Logo/Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Login
            </h1>
            <p className="text-gray-600 dark:text-ms-dark-200">
              Sign in to your Chore Mate account
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-gray-50 dark:bg-ms-dark-800 rounded-lg border border-gray-200 dark:border-ms-dark-700 p-8">
            <Form />
          </div>

          {/* Footer Links */}
          <div className="text-center space-y-2">
            <a
              href="/forgot-password"
              className="text-ms-blue-500 hover:text-ms-blue-600 dark:hover:text-ms-blue-400 text-sm transition-colors"
            >
              Forgot password?
            </a>
            <p className="text-gray-600 dark:text-ms-dark-200 text-sm">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-ms-blue-500 hover:text-ms-blue-600 dark:hover:text-ms-blue-400 font-medium transition-colors"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
