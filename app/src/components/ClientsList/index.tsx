import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
    Box,
    IconButton,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from '../../constants/index.ts';
import { useAppState } from "../../state/stateContext";
import { ClientType } from "../../types";
import { dateText } from "../../utils/date-text.ts";
import { isAdmin } from "../../utils/isWho";
import Highlight from '../HighlightText';

interface ClientsListProps {
    clients: ClientType[];
    handleDeleteClients: (id: number) => void;
    search: string;
}

const ClientsList: React.FC<ClientsListProps> = ({ clients, handleDeleteClients, search }) => {
    const { t } = useTranslation();
    const { user } = useAppState();
    const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");
    const [orderBy, setOrderBy] = useState<keyof ClientType>("lastName");
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const handleSortRequest = (column: keyof ClientType) => {
        const isAsc = orderBy === column && orderDirection === "asc";
        setOrderDirection(isAsc ? "desc" : "asc");
        setOrderBy(column);
    };

    const sortedClients = [...clients].sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];

        if (typeof aValue === "string" && typeof bValue === "string") {
            return orderDirection === "asc"
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
            return orderDirection === "asc" ? aValue - bValue : bValue - aValue;
        }

        return 0;
    });

    const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

    const handleRowClick = (clientId: number) => {
        navigate(`/client/${clientId}`);
    };

    const currentPageClients = sortedClients.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <div id="ClientsList" className="clients-list">
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === "id"}
                                    direction={orderBy === "id" ? orderDirection : "asc"}
                                    onClick={() => handleSortRequest("id")}
                                >
                                    {t('ID')}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">{t('Name')}</TableCell>
                            <TableCell align="right">{t('Company')}</TableCell>
                            <TableCell align="right">{t('Email')}</TableCell>
                            <TableCell align="right">{t('Registered')}</TableCell>
                            <TableCell align="right">{t('Actions')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentPageClients.map((client) => (
                            <TableRow
                                key={client.id}
                                sx={{
                                    "&:last-child td, &:last-child th": { border: 0 },
                                    cursor: "pointer",
                                }}
                                hover
                                onClick={() => handleRowClick(client.id)}
                            >
                                <TableCell component="th" scope="row">
                                    {client.id}
                                </TableCell>
                                <TableCell align="right">
                                    <Highlight text={`${client.firstName} ${client.lastName}`} search={search} />
                                </TableCell>
                                <TableCell align="right">
                                    <Highlight text={client.companyName} search={search} />
                                </TableCell>
                                <TableCell align="right">
                                    <Highlight text={client.email} search={search} />
                                </TableCell>
                                <TableCell align="right">
                                    {dateText(client.createdAt)}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        disabled={!isAdmin(user)}
                                        aria-label="edit"
                                        component={Link}
                                        to={ROUTES(client.id).editClient}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        disabled={!isAdmin(user)}
                                        aria-label="delete"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteClients(client.id);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ padding: 2 }}>
                <Pagination
                    count={Math.ceil(clients.length / itemsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                />
            </Box>
        </div>
    );
};

export default ClientsList;
