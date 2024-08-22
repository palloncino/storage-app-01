import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../components/Loading";
import Breadcrumb from "../../components/Breadcrumb";
import { PALETTE, ROUTES } from "../../constants/index.ts";
import Logo from "../../media/logo.png";
import { useAppState } from "../../state/stateContext";
import { isAdmin, isUser } from "../../utils/isWho";

const StyledAppBar = styled.div`
  background: ${PALETTE.BlueGradient};
  color: #fff;
  width: 100%;
  height: 240px;
  top: 0;
  z-index: 1100; /* Ensure it stays above other components */
`;

const StyledContainer = styled.div`
  max-width: 1360px;
  margin: auto;
  padding: 24px;
  height: 100%;
`;

const StyledToolbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoButton = styled(RouterLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
`;

const LogoImage = styled.img`
  height: 50px;
  margin-right: 10px;
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-radius: 0;
  padding-right: 8px;
`;

const UserName = styled.span`
  font-weight: 500;
  font-size: 1.2rem;
`;

const UserCompany = styled.span`
  font-weight: 500;
  font-size: 0.8rem;
`;

function Navbar() {
  const { t, i18n } = useTranslation();
  const { user, logout, isLoadingAuthorization } = useAppState();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate(ROUTES().profile);
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    logout();
    handleMenuClose();
  };

  const renderVisitorLinks = () => (
    <>
      {/* <Button onClick={() => navigate("/login")}>{t("Login")}</Button>
      <Button onClick={() => navigate("/signup")}>{t("SignUp")}</Button> */}
    </>
  );

  const renderUserLinks = () => (
    <>
      <UserDisplay>
        <UserInfo>
          <UserName>
            {user ? `${user.firstName} ${user.lastName}` : ""}
          </UserName>
          <UserCompany>
            {user
              ? `${user.role}`
              : ""}
          </UserCompany>
        </UserInfo>
      </UserDisplay>
      <IconButton onClick={handleMenuOpen} color="inherit">
        <Avatar />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleProfileClick}>{t("ViewProfile")}</MenuItem>
        <MenuItem onClick={handleLogoutClick}>{t("Logout")}</MenuItem>
      </Menu>
    </>
  );

  const renderAdminLinks = () => <>{renderUserLinks()}</>;

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "it" : "en";
    i18n.changeLanguage(newLanguage);
  };

  if (isLoadingAuthorization) return <Loading />;

  return (
    <StyledAppBar id="Navbar">
      <StyledContainer>
        <StyledToolbar>
          <LogoButton to="/">
            {/* <LogoImage src={Logo} alt="Logo" /> */}
            <LogoText>
              <span style={{ fontSize: "1.4rem" }}>{t("Warehouse")}</span>
              <span>{t("Subtitle catch phrase")}</span>
            </LogoText>
          </LogoButton>
          {!isMobile && (
            <ActionContainer>
              {!user && renderVisitorLinks()}
              {isUser(user) && renderUserLinks()}
              {isAdmin(user) && renderAdminLinks()}
              <Tooltip title={t("Toggle Language")}>
                <IconButton onClick={toggleLanguage} style={{ color: "#fff" }}>
                  {i18n.language === "en" ? "IT" : "EN"}
                </IconButton>
              </Tooltip>
            </ActionContainer>
          )}
          {isMobile && (
            <IconButton>
              <MenuIcon />
            </IconButton>
          )}
        </StyledToolbar>
        <Breadcrumb />
      </StyledContainer>
    </StyledAppBar>
  );
}

export default Navbar;
