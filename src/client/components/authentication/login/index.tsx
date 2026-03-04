import { Link } from "react-router-dom";
import { Form } from "./login-form";
import { usePreventBackButton } from "@hooks/usePreventBackButton";
import { H1, P } from "@/client/shared";

export const Login = () => {
  usePreventBackButton();
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="space-y-8">
          <div className="text-center">
            <H1 className="mb-4">Login</H1>
            <P>Sign in to your Chore Mate account</P>
          </div>
          <div className="dark:bg-vscode-bg-secondary rounded-lg border border-gray-200 dark:border-vscode-border p-8">
            <Form />
          </div>
          <div className="text-center space-y-2">
            <Link
              to="/forgot-password"
              className="text-ms-blue-500 hover:text-ms-blue-600 dark:hover:text-vscode-blue dark:text-vscode-blue text-sm transition-colors"
            >
              Forgot password?
            </Link>
            <p className="text-gray-600 dark:text-vscode-text-secondary text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-ms-blue-500 hover:text-ms-blue-600 dark:hover:text-vscode-blue dark:text-vscode-blue font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
