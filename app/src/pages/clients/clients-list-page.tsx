import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import ClientsList from "../../components/ClientsList/index.tsx";
import FilterBar from "../../components/FilterBar";
import FlashMessage from "../../components/FlashMessage";
import Loading from "../../components/Loading";
import { ROUTES, getClientsFiltersConfig } from "../../constants/index.ts";
import { useAppState } from "../../state/stateContext";
import { WhitePaperContainer } from "../../styled-components/index.tsx";
import applyFilters from "../../utils/apply-filters";
import { isAdmin } from "../../utils/isWho";

const StyledContainer = styled(Container)`
  margin-top: 32px;
  margin-bottom: 32px;
`;

const ClientListPage: React.FC = () => {
    const { t } = useTranslation();
    const { user, clients, deleteClients, getClients, loadingClients } = useAppState();
    const [filters, setFilters] = useState<any>({});
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        getClients();
    }, [getClients]);

    const handleFilterChange = (filterName: string, value: string | boolean) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: value,
        }));
    };

    const handleDeleteClients = async (id: number) => {
        try {
            const clientConfirmed = window.confirm(
                t("ConfirmDeletionClientAlertMessage")
            );

            if (clientConfirmed) {
                const response = await deleteClients([id]);
                const { message } = response;
                setSuccessMessage(message);
                getClients(); // Refresh clients list after deletion
            }
        } catch (error) {
            console.error(error);
        }
    };

    const filteredItems = useMemo(() => {
        if (!clients) {
            return [];
        }
        return loadingClients || clients.length === 0
            ? []
            : applyFilters(clients, filters);
    }, [loadingClients, clients, filters]);

    return (
        <WhitePaperContainer>
            <StyledContainer maxWidth="lg">
                {successMessage && (
                    <FlashMessage message={successMessage} type="success" />
                )}
                {loadingClients ? (
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
                                <Typography variant="h4">{t("ClientsListPageHeadTitle")}</Typography>
                                <Typography variant="subtitle1">{t("ClientsListPageHeadDesc")}</Typography>
                            </Grid>
                            <Grid item xs={12} md={4} display="flex" justifyContent="flex-end">
                                <Button
                                    disabled={!isAdmin(user)}
                                    variant="contained"
                                    color="primary"
                                    component={RouterLink}
                                    to={ROUTES().createClient}
                                >
                                    {t("CreateNewClient")}
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3} sx={{ mt: 2 }}>
                            <Grid item xs={12}>
                                <FilterBar
                                    filters={filters}
                                    filtersConfig={getClientsFiltersConfig()}
                                    onFilterChange={handleFilterChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ClientsList
                                    search={filters.search}
                                    clients={filteredItems}
                                    handleDeleteClients={handleDeleteClients}
                                />
                            </Grid>
                        </Grid>
                    </>
                )}
            </StyledContainer>
        </WhitePaperContainer>
    );
};

export default ClientListPage;
