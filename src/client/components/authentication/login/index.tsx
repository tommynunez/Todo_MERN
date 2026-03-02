import { Grid } from "@mui/material";
import { Form } from "./login-form";
import { usePreventBackButton } from "@hooks/usePreventBackButton";

export const Login = () => {
  usePreventBackButton();
  return (
    <>
      <Grid container spacing={0}>
        <Grid alignItems="center">
          <div />
          <div>
            <h1>Login</h1>
            <p>Fill in the fields below to login to your account</p>
          </div>
          <div className="py-4">
            <Form />
          </div>
        </Grid>
      </Grid>
    </>
  );
};
