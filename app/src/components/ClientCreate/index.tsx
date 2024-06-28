import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ClientType } from "../../types";

const CreateClientContainer = styled(Card)`
  margin-top: 32px;
`;

interface CreateClientProps {
  client: ClientType;
  setClient: React.Dispatch<React.SetStateAction<ClientType>>;
  handleSubmit: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleAddressChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => void;
}

const CreateClient: React.FC<CreateClientProps> = ({
  client,
  handleSubmit,
  handleChange,
  handleAddressChange,
}) => {
  const { t } = useTranslation();

  const canSubmit =
    client.fiscalCode &&
    client.vatNumber &&
    client.firstName &&
    client.lastName &&
    client.companyName &&
    client.email &&
    client.address.street &&
    client.address.city &&
    client.address.zipCode &&
    client.address.country;

  return (
    <CreateClientContainer>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Fiscal Code"
              name="fiscalCode"
              value={client.fiscalCode}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="VAT Number"
              name="vatNumber"
              value={client.vatNumber}
              onChange={handleChange}
              required
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={client.firstName}
              onChange={handleChange}
              required
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={client.lastName}
              onChange={handleChange}
              required
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Company Name"
              name="companyName"
              value={client.companyName}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={client.email}
              onChange={handleChange}
              required
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobileNumber"
              value={client.mobileNumber}
              onChange={handleChange}
              required
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">{t("Address")}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Street"
                  name="street"
                  value={client.address.street}
                  onChange={(e) => handleAddressChange(e, "street")}
                  required
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={client.address.city}
                  onChange={(e) => handleAddressChange(e, "city")}
                  required
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  fullWidth
                  label="Zip Code"
                  name="zipCode"
                  value={client.address.zipCode}
                  onChange={(e) => handleAddressChange(e, "zipCode")}
                  required
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  value={client.address.country}
                  onChange={(e) => handleAddressChange(e, "country")}
                  required
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button
              variant={!canSubmit ? "outlined" : "contained"}
              onClick={handleSubmit}
              sx={{ mr: 2 }}
            >
              {t("CreateClient")}
            </Button>
            <Button variant="outlined" onClick={() => window.history.back()}>
              {t("Cancel")}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </CreateClientContainer>
  );
};

export default CreateClient;
