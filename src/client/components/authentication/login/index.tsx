import { Grid } from "@mui/material";
import { Form } from "./login-form";
import { usePreventBackButton } from "@hooks/usePreventBackButton";

export const Login = () => {
  usePreventBackButton();
  return (
    <>
      <Grid container spacing={0}>
        <Grid
          alignItems="center"
          className="d-flex align-items-center justify-content-center flex-column"
        >
          <div className="divider-v divider-v-lg d-none d-md-block" />
          <div className="text-center mt-4">
            <h1 className="font-size-xxl mb-1 font-weight-bold">Login</h1>
            <p className="mb-0 text-black-50">
              Fill in the fields below to login to your account
            </p>
          </div>
          <div className="py-4">
            <Form />
          </div>
        </Grid>
      </Grid>
    </>
  );
};
