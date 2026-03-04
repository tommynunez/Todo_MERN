import { clearErrorIfHasValue } from "@/client/helpers/validator";
import { useLoginForm } from "@hooks/useLoginForm";
import { Input, Button } from "@/client/shared";
import { useSnackbar } from "@/client/context/SnackbarContext";
import { useEffect } from "react";

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
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (hasErrors) {
      showSnackbar("Please fix the errors in the form", { variant: "error" });
    }
  }, [hasErrors, showSnackbar]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        label="Email Address"
        placeholder="your@email.com"
        value={emailAddress}
        onChange={(e) => {
          setEmailAddress(e.target.value);
          clearErrorIfHasValue(
            e.target.value,
            emailAddressError,
            setEmailAddressError,
          );
        }}
        autoComplete="off"
        error={emailAddressError ? "Please enter a valid email address" : ""}
        required
      />

      <Input
        type="password"
        label="Password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          clearErrorIfHasValue(e.target.value, passwordError, setPasswordError);
        }}
        autoComplete="off"
        error={passwordError ? "Please enter your password" : ""}
        required
      />

      <Button type="submit" fullWidth className="mt-6">
        Sign In
      </Button>
    </form>
  );
};
