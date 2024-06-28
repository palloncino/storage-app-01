import CloseIcon from "@mui/icons-material/Close";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Dialog,
    DialogTitle,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../components/Loading/index.js";
import PageHeader from "../../components/PageHeader/index.tsx";
import { ROUTES } from "../../constants/index.ts";
import { useAppState } from "../../state/stateContext.js";
import { ClientType } from '../../types/index.ts';

const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ClientPage: FC = () => {
    const { t } = useTranslation();
    const { clientId } = useParams<{ clientId: string }>();
    const { clients, getClients, loadingClients } = useAppState();
    const [theClient, setTheClient] = useState<ClientType | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!clients.length) {
            getClients();
        } else {
            setIsLoading(false);
        }
    }, [getClients, clients.length]);

    useEffect(() => {
        const foundClient = clients.find(({ id }) => id.toString() === clientId);
        setTheClient(foundClient || null);
        setIsLoading(false);
    }, [clientId, clients]);

    const handleCloseDialog = () => setOpenDialog(false);

    if (isLoading || loadingClients) {
        return <Loading />;
    }

    if (!theClient) {
        return (
            <Container
                maxWidth="sm"
                sx={{
                    mt: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4" gutterBottom color="error">
                    {t("404ClientNotFound")}
                </Typography>
                <Typography variant="subtitle1">
                    {t("404ClientNotFoundErrorMessage", { id: clientId })}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={ROUTES().clientList}
                >
                    {t("BackToClientsList")}
                </Button>
            </Container>
        );
    }

    return (
        <>
            <Container maxWidth="lg">

                <PageHeader title={t("ClientPageTitle")} description={`${theClient.firstName} ${theClient.lastName}`} margin={'0'} />
                <HeadContainer>
                                <CardActions>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component={Link}
                                        to={ROUTES(clientId).editClient}
                                    >
                                        {t("EditClient")}
                                    </Button>
                                </CardActions>
                            </HeadContainer>
                    <Card sx={{ width: "100%" }}>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{t("ID")}</TableCell>
                                        <TableCell>{theClient.id}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>{t("FiscalCode")}</TableCell>
                                        <TableCell>{theClient.fiscalCode}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>{t("VAT Number")}</TableCell>
                                        <TableCell>{theClient.vatNumber}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>{t("First Name")}</TableCell>
                                        <TableCell>{theClient.firstName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>{t("Last Name")}</TableCell>
                                        <TableCell>{theClient.lastName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>{t("Company Name")}</TableCell>
                                        <TableCell>{theClient.companyName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>{t("Email")}</TableCell>
                                        <TableCell>{theClient.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>{t("Mobile Number")}</TableCell>
                                        <TableCell>{theClient.mobileNumber}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>{t("Address")}</TableCell>
                                        <TableCell>{`${theClient.address.street}, ${theClient.address.city}, ${theClient.address.zipCode}, ${theClient.address.country}`}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>{t("Registered")}</TableCell>
                                        <TableCell>{new Date(theClient.createdAt).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>{t("Last Updated")}</TableCell>
                                        <TableCell>{new Date(theClient.updatedAt).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg">
                        <DialogTitle>
                            <IconButton
                                aria-label="close"
                                onClick={handleCloseDialog}
                                sx={{ position: "absolute", right: 8, top: 8 }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                    </Dialog>

            </Container>
        </>
    );
};

export default ClientPage;
