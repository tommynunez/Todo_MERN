import { clearErrorIfHasValue } from "@/client/helpers/validator";
import { useLoginForm } from "@hooks/useLoginForm";
import { Input, Button } from "@/client/shared";

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
        error={passwordError ? "Please enter your password" : ""}
        required
      />

      <Button type="submit" fullWidth className="mt-6">
        Sign In
      </Button>
    </form>
  );
};
