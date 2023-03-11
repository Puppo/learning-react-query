import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { FormEventHandler } from "react";
import { Link } from "react-router-dom";
import { useSignUp } from "../../../auth/useSignUp";

const styles = {
  Paper: {
    padding: 20,
    margin: "auto",
    textAlign: "center",
    width: 500
  }
} as const;

function SignUpPage() {
  const signUp = useSignUp();

  const onSignUp: FormEventHandler<HTMLFormElement> = (form) => {
    form.preventDefault();
    const formData = new FormData(form.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    if (typeof email === 'string' && typeof password === 'string') {
      signUp({
        email,
        password
      });
    }
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Paper style={styles.Paper}>
          <Typography variant="h3" component="h2"
            paddingBottom="25px">
            Sign Up
          </Typography>
          <Box component="form"
            onSubmit={onSignUp}
            sx={{
              display: 'flex',
              flexFlow: 'column',
              mt: 1
            }}
          >
            <TextField
              label="email"
              name="email"
              required
              margin="normal"
            />

            <TextField
              label="password"
              name="password"
              type="password"
              required
              margin="normal"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1
              }}>
              Sign Up
            </Button>

            <Button
              component={Link}
              to='/auth/sign-in'
              fullWidth
              variant="outlined"
              sx={{
                mt: 2
              }}>
              Sign In
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );

}

export default SignUpPage;
