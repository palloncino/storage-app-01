import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import FlashMessage from "../../components/FlashMessage/index.js";
import Loading from "../../components/Loading/index.js";
import EditUser from "../../components/UserEdit/index.tsx";
import { ROUTES, SectionBorderContainer } from "../../constants/index.ts";
import { useAppState } from "../../state/stateContext.js";
import { UserType } from '../../types/index.ts';
import PageHeader from "../../components/PageHeader/index.tsx";

const EditUserPage: React.FC = () => {
  const { t } = useTranslation();
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { users, editUser, editUserIsLoading, getUsersIsLoading, getUsers } = useAppState();
  const [theUser, setTheUser] = useState<UserType | undefined>(undefined); // Start with undefined to distinguish unloaded state
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!users.length) {
      getUsers();
    }
  }, [getUsers, users.length]);

  useEffect(() => {
    const foundUser = users.find(({ id }) => id.toString() === userId);
    setTheUser(foundUser);
  }, [userId, users]);

  const handleSave = async (editedUser: UserType) => {
    try {
      const data = await editUser(editedUser);
      setMessage(`User updated successfully. ID: ${data.id}, Name: ${data.firstName} ${data.lastName}`);
    } catch (error: any) {
      console.error({ error });
      setErrorMessage(`Failed to edit user: ${error.message}`);
    }
  };

  const handleCancel = () => navigate(-1);

  if (getUsersIsLoading || editUserIsLoading || theUser === undefined) {
    return <Loading />;
  }

  if (!theUser) {
    return (
      <StyledContainer>
        <Box my={2}>
          <FlashMessage message={t("404UserNotFoundErrorMessage", { id: userId })} type="error" />
        </Box>
        <Button component={Link} to={ROUTES().userList} variant="contained">
          {t("BackToUsersList")}
        </Button>
      </StyledContainer>
    );
  }

  return (
    <Container maxWidth={'lg'}>
      <PageHeader title={t("EditingUser")} description={`${theUser.firstName} ${theUser.lastName}`} />
      <SectionBorderContainer>
        {errorMessage && <Box my={2}><FlashMessage message={errorMessage} type="error" /></Box>}
        {message && <Box my={2}><FlashMessage message={message} type="success" /></Box>}

        <Typography component="p" gutterBottom>
          {t("ID")}: {theUser.id}.{" "}
          <Link to={ROUTES(theUser.id).userPage} style={{ textDecoration: "none" }}>
            {t("ViewDetails")}.
          </Link>
        </Typography>
        <EditUser user={theUser} onSave={handleSave} onCancel={handleCancel} />
      </SectionBorderContainer>
    </Container>
  );
};

export default EditUserPage;

const StyledContainer = styled(Container)`
  margin-top: 32px;
  margin-bottom: 32px;
`;
