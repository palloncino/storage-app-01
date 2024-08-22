import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField
} from "@mui/material";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import FlashMessage from "../../components/FlashMessage";
import PageHeader from "../../components/PageHeader/index.tsx";
import { useAppState } from "../../state/stateContext";
import { WhitePaperContainer } from '../../styled-components/index.tsx';

interface UserType {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
}

const StyledContainer = styled(Container)`
  max-width: 600px;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledForm = styled.form`
  margin-top: 24px;
  width: 100%;
  margin: 2rem auto;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)`
  margin-top: 24px;
  height: 56px;
  font-size: 1rem;
`;

const SignupPage: React.FC = () => {
  const { t } = useTranslation();
  const { signup, signupError, signupSuccessMessage } = useAppState();
  const [formData, setFormData] = useState<UserType>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "admin",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (formData.password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    signup(formData);
  };

  return (
    <WhitePaperContainer>
      <StyledContainer maxWidth="lg">

        {signupError &&
          <Box pt={2}>
            <FlashMessage message={signupError} type="error" />
          </Box>
        }
        {signupSuccessMessage && (
          <Box pt={2}>
            <FlashMessage message={signupSuccessMessage} type="success" />
          </Box>
        )}
        <Box>
          <PageHeader title={t("Register")} margin={"0"} />

          <StyledForm onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label={t("Username")}
                  name="username"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleTextChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label={t("FirstName")}
                  name="firstName"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleTextChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label={t("LastName")}
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleTextChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={t("Email")}
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleTextChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label={t("Password")}
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleTextChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="confirmPassword"
                  label={t("ConfirmPassword")}
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Box my={4} width={'100%'}>
              <StyledButton
                type="submit"
                variant="contained"
              >
                {t("Register")}
              </StyledButton>
            </Box>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {t("ChangeToLogin")}
                </Link>
              </Grid>
            </Grid>
          </StyledForm>
        </Box>
      </StyledContainer>
    </WhitePaperContainer>
  );
}

export default SignupPage;
