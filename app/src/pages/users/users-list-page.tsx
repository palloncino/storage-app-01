import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import FilterBar from "../../components/FilterBar";
import FlashMessage from "../../components/FlashMessage";
import Loading from "../../components/Loading";
import UsersList from "../../components/UsersList/index.tsx";
import { ROUTES, getUsersFiltersConfig } from "../../constants/index.ts";
import { useAppState } from "../../state/stateContext";
import applyFilters from "../../utils/apply-filters";
import { isAdmin } from "../../utils/isWho";
import { WhitePaperContainer } from "../../styled-components/index.tsx";

const StyledContainer = styled(Container)`
  margin-top: 32px;
  margin-bottom: 32px;
`;

const UsersListPage: React.FC = () => {
  const { t } = useTranslation();
  const { user, users, deleteUsers, getUsers, loadingUsers } = useAppState();
  const [filters, setFilters] = useState<any>({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleFilterChange = (filterName: string, value: string | boolean) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleDeleteUsers = async (id: number) => {
    try {
      const userConfirmed = window.confirm(
        t("ConfirmDeletionUserAlertMessage")
      );

      if (userConfirmed) {
        const response = await deleteUsers([id]);
        const { message } = response;
        setSuccessMessage(message);
        getUsers(); // Refresh users list after deletion
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredItems = useMemo(() => {
    return loadingUsers || users.length === 0
      ? []
      : applyFilters(users, filters);
  }, [loadingUsers, users, filters]);

  return (
    <WhitePaperContainer>
      <StyledContainer maxWidth="lg">
        {successMessage && (
          <FlashMessage message={successMessage} type="success" />
        )}
        {loadingUsers ? (
          <Loading />
        ) : (
          <>
            <Grid
              container
              spacing={3}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={12} md={8}>
                <Typography variant="h4">{t("UsersListPageHeadTitle")}</Typography>
                <Typography variant="subtitle1">{t("UsersListPageHeadDesc")}</Typography>
              </Grid>
              <Grid item xs={12} md={4} display="flex" justifyContent="flex-end">
                <Button
                  disabled={!isAdmin(user)}
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to={ROUTES().profile}
                >
                  {t("MyUserProfile")}
                </Button>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <FilterBar
                  filters={filters}
                  filtersConfig={getUsersFiltersConfig()}
                  onFilterChange={handleFilterChange}
                />
              </Grid>
              <Grid item xs={12}>
                <UsersList
                  search={filters.search}
                  users={filteredItems}
                  handleDeleteUsers={handleDeleteUsers}
                />
              </Grid>
            </Grid>
          </>
        )}
      </StyledContainer>
    </WhitePaperContainer>
  );
};

export default UsersListPage;
