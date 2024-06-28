import styled from "styled-components";
import i18n from "../i18n"; // Ensure correct path to your i18n setup
import { Company } from "../types";

export const getUsersFiltersConfig = () => [
  { name: "search", type: "text", placeholder: i18n.t("Search...") }
];

export const getClientsFiltersConfig = () => [
  { name: "search", type: "text", placeholder: i18n.t("Search...") },
];

export const getProductsFiltersConfig = (company?: string) => {
  const filters = [
    { name: "search", type: "text", placeholder: i18n.t("Search...") },
    {
      name: "category",
      type: "select",
      options: [
        { value: "all", label: i18n.t("AllCategories") },
        { value: "Vasche", label: i18n.t("Vasche") },
        { value: "Cifa", label: i18n.t("Cifa") },
      ],
    },
  ];

  if (company) {
    const companyValue =
      company === "Sermixer" ? "sermixer" : "s2_truck_service";
    const labelValue = company === "Sermixer" ? "Sermixer" : "S2TruckService";
    filters.push({
      name: "company",
      type: "select",
      options: [{ value: companyValue, label: i18n.t(labelValue) }],
      value: companyValue, // Pre-select the company
    });
  } else {
    filters.push({
      name: "company",
      type: "select",
      options: [
        { value: "all", label: i18n.t("AllCompanies") },
        { value: "sermixer", label: i18n.t("Sermixer") },
        { value: "s2_truck_service", label: i18n.t("S2TruckService") },
      ],
    });
  }

  return filters;
};

export const getDocumentsFiltersConfig = () => [
  { name: "search", type: "text", placeholder: i18n.t("Search...") },
  {
    name: "company",
    type: "select",
    options: [
      { value: "all", label: i18n.t("AllCompanies") },
      {
        value: "Sermixer" as Company,
        label: i18n.t("Sermixer"),
      },
      {
        value: "S2 Truck Service" as Company,
        label: i18n.t("S2TruckService"),
      },
    ],
  },
];

export const ROUTES: any = (id: string | number = "") => ({
  // Products
  productList: "/products-list",
  createProduct: "/create-product",
  editProduct: `/edit-product/${id}`,
  productPage: `/product/${id}`,
  // Quotes
  quotesList: "/quotes-list",
  editQuote: `/edit-quote/${id}`,
  // Documents
  documentsList: "/documents-list",
  createDocument: "/create-document",
  // Users
  profile: "/profile",
  usersList: "/users-list",
  editUser: `/edit-user/${id}`,
  userPage: `/user/${id}`,
  // Clients
  clientsList: "/clients-list",
  createClient: "/create-client",
  editClient: `/edit-client/${id}`,
  clientPage: `/client/${id}`,
});

export const STATUSES = {
  DOCUMENT_OPENED: "DOCUMENT_OPENED",
  EMAIL_OTP: "EMAIL_OTP",
  CLIENT_SIGNATURE: "CLIENT_SIGNATURE",
  STORAGE_CONFIRMATION: "STORAGE_CONFIRMATION",
  EXPIRED: "EXPIRED",
  REJECTED: "REJECTED",
};

export const SectionBorderContainer = styled.div`
  border-bottom-left-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
  border-top: none;
  padding: 2rem 2rem 2rem 2rem;
`;

export const PALETTE = {
  Green: "#8FD300",
  Blue: "#65acf2",
  ShineButton: "#65acf2",
  Red: "#f44336",
  Gray: '#333',
  BlueGradient: "linear-gradient(135deg, #ff7e5f, #feb47b)",
  Black3: "#333",
  White: "#fff",
};
