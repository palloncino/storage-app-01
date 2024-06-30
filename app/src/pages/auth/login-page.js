import { Box, Button, Grid, Link, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FlashMessage from "../../components/FlashMessage";
import PageHeader from "../../components/PageHeader/index.tsx";
import { useAppState } from "../../state/stateContext";
import { WhitePaperContainer } from '../../styled-components/index.tsx'

function LoginPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, loginIsLoading, loginError } = useAppState(); // Use the context to access the login function

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      try {
        await login({ email: formData.email, password: formData.password });
      } catch (error) {
        alert("Login Failed: " + error.message); // Display error message to the user
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
      <WhitePaperContainer>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <PageHeader title={t("Login")} margin={"0"} />
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loginIsLoading}
            >
              {t("Login")}
            </Button>
            {loginError && <FlashMessage message={loginError} type="error" />}
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {t("ChangeToSignup")}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </WhitePaperContainer>
  );
}

export default LoginPage;
