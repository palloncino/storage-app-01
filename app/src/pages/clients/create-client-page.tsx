import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import CreateClient from "../../components/ClientCreate/index.tsx";
import FlashMessage from "../../components/FlashMessage/index.js";
import Loading from "../../components/Loading/index.js";
import { useAppState } from "../../state/stateContext.js";
import { ClientType } from "../../types/index.ts";
import PageHeader from "../../components/PageHeader/index.tsx";
import { WhitePaperContainer } from "../../styled-components/index.tsx";

const StyledContainer = styled(Container)`
  margin-top: 32px;
`;

const CreateClientPage: React.FC = () => {
  const { t } = useTranslation();
  const { addClient, addClientError } = useAppState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [client, setClient] = useState<ClientType>({
    id: 0,
    fiscalCode: "",
    vatNumber: "",
    firstName: "",
    lastName: "",
    companyName: "",
    address: {
      street: "",
      city: "",
      zipCode: "",
      country: "IT",
    },
    email: "",
    mobileNumber: "",
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const returnedClient = await addClient(client);
      setMessage(
        `Successfully created client ${returnedClient.firstName} ${returnedClient.lastName}, ID: ${returnedClient.id}.`
      );
      setClient({
        id: 0,
        fiscalCode: "",
        vatNumber: "",
        firstName: "",
        lastName: "",
        companyName: "",
        address: {
          street: "",
          city: "",
          zipCode: "",
          country: "IT",
        },
        email: "",
        mobileNumber: "",
      });
    } catch (error) {
      console.error("Failed to add client:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const { value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      address: {
        ...prevClient.address,
        [field]: value,
      },
    }));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <WhitePaperContainer>
      <StyledContainer maxWidth="md">
        <Box my={4}>
          {addClientError && (
            <FlashMessage message={addClientError} type="error" />
          )}
          {message && <FlashMessage message={message} type="success" />}
          <PageHeader title={t("CreateNewClient")} margin={'0'} />
          <CreateClient
            client={client}
            setClient={setClient}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleAddressChange={handleAddressChange}
          />
        </Box>
      </StyledContainer>
    </WhitePaperContainer>
  );
};

export default CreateClientPage;
