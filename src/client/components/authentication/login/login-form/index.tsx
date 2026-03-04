import { Link } from "react-router-dom";
import { useLoginForm } from "@hooks/useLoginForm";
import { clearErrorIfHasValue } from "@/client/helpers/validator";

export const Form = () => {
  const {
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    emailAddressError,
    setEmailAddressError,
    passwordError,
    setPasswordError,
    handleSubmit,
    hasErrors,
  } = useLoginForm();

  const HelperTextRequired = (isError: any, label: string) => {
    return isError ? label + " is required" : null;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-ms-dark-200 mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={emailAddress}
          onChange={(e) => {
            setEmailAddress(e.target.value);
            clearErrorIfHasValue(e.target.value, setEmailAddressError);
          }}
          className="w-full px-3 py-2 bg-white dark:bg-ms-dark-700 border border-gray-300 dark:border-ms-dark-600 rounded-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-ms-dark-300 focus:outline-none focus:ring-2 focus:ring-ms-blue-500 focus:border-transparent transition-colors"
          placeholder="your@email.com"
        />
        {emailAddressError && (
          <p className="mt-1 text-sm text-red-500">{emailAddressError}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-ms-dark-200 mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearErrorIfHasValue(e.target.value, setPasswordError);
          }}
          className="w-full px-3 py-2 bg-white dark:bg-ms-dark-700 border border-gray-300 dark:border-ms-dark-600 rounded-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-ms-dark-300 focus:outline-none focus:ring-2 focus:ring-ms-blue-500 focus:border-transparent transition-colors"
          placeholder="••••••••"
        />
        {passwordError && (
          <p className="mt-1 text-sm text-red-500">{passwordError}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-ms-blue-500 hover:bg-ms-blue-600 active:bg-ms-blue-700 dark:hover:bg-ms-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 mt-6"
      >
        Sign In
      </button>
    </form>
  );
};
