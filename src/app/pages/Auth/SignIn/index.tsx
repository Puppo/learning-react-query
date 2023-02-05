import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";

const styles = {
  Paper: {
    padding: 20,
    margin: "auto",
    textAlign: "center",
    width: 500
  }
} as const;

function SignInPage() {

  const onSignIn = () => {
    // TODO: handle sign-in
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Paper style={styles.Paper}>
          <Typography variant="h3" component="h2"
            paddingBottom="25px">
            Sign In
          </Typography>
          <Box component="form"
            sx={{
              display: 'flex',
              flexFlow: 'column'
            }}
          >
            <TextField
              label="username"
            />

            <TextField
              label="password"
              type="password"
            />

            <Button
              type="submit">
              Sign in
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );

}

export default SignInPage;
