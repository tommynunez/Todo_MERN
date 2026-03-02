import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
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
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Left side - Login Form */}
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
          <Typography variant="h4" fontWeight={700} mb={3}>
            Welcome back
          </Typography>

          <Box
            component="form"
            onSubmit={(event: any) => {
              handleSubmit(event);
            }}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <>
              <TextField
                autoComplete="current-password"
                required={true}
                fullWidth
                variant="outlined"
                id={"textfield-emailAddress"}
                type="text"
                label="Email address"
                name="emailAddress"
                error={emailAddressError}
                value={emailAddress}
                tabIndex={0}
                onBlur={(event: any) => {
                  clearErrorIfHasValue(
                    event.target.value,
                    emailAddressError,
                    setEmailAddressError,
                  );
                }}
                onChange={(event: any) => {
                  setEmailAddress(event.target.value);
                  clearErrorIfHasValue(
                    event.target.value,
                    emailAddressError,
                    setEmailAddressError,
                  );
                }}
                helperText={HelperTextRequired(
                  emailAddressError,
                  "Email address",
                )}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {<i className="fas fa-envelope"></i>}
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                autoComplete="current-password"
                required={true}
                fullWidth
                variant="outlined"
                id={"textfield-password"}
                type="password"
                label="Password"
                name="password"
                error={passwordError}
                value={password}
                tabIndex={0}
                onBlur={(event: any) => {
                  clearErrorIfHasValue(
                    event.target.value,
                    passwordError,
                    setPasswordError,
                  );
                }}
                onChange={(event: any) => {
                  setPassword(event.target.value);
                  clearErrorIfHasValue(
                    event.target.value,
                    passwordError,
                    setPasswordError,
                  );
                }}
                helperText={HelperTextRequired(passwordError, "Password")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {<i className="fas fa-lock"></i>}
                    </InputAdornment>
                  ),
                }}
              />

              <div className="text-center">
                {hasErrors ? (
                  <Typography
                    variant="caption"
                    gutterBottom
                    className="text-danger"
                  >
                    Invalid email or password
                  </Typography>
                ) : null}
              </div>
              <div className="text-center">
                <Button
                  type="submit"
                  tabIndex={0}
                  className="btn-primary font-weight-bold w-50 my-2"
                  onClick={(event: any) => {
                    handleSubmit(event);
                  }}
                >
                  Sign in
                </Button>
              </div>
              <div className="text-center text-black-50 mt-3">
                Don't have an account?{" "}
                <Link to="/registration" className="text-first">
                  Sign up
                </Link>
              </div>
            </>
          </Box>

          <Typography variant="body2" sx={{ mt: 3 }}>
            Don’t have an account?{" "}
            <a href="/signup" style={{ color: "#1976d2", fontWeight: 500 }}>
              Sign up
            </a>
          </Typography>
        </Paper>
      </Container>

      {/* Right side - Image */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "block" },
        }}
      >
        <img
          src="/your-image.jpg"
          alt="Login visual"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
    </Box>
  );
};
