import { ViewList, ViewModule } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import FilterBar from "../../components/FilterBar";
import FlashMessage from "../../components/FlashMessage";
import Loading from "../../components/Loading";
import ProductGrid from "../../components/ProductGrid";
import ProductList from "../../components/ProductList/index.tsx";
import { ROUTES, getProductsFiltersConfig } from "../../constants/index.ts";
import { useAppState } from "../../state/stateContext";
import { WhitePaperContainer } from "../../styled-components/index.tsx";
import applyFilters from "../../utils/apply-filters";
import { isAdmin } from "../../utils/isWho.js";

function ProductListPage() {
  const { t } = useTranslation();
  const { user, products, deleteProducts, getProducts, loadingProducts } =
    useAppState();
  const [filters, setFilters] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [viewMode, setViewMode] = useState("list"); // list | grid

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleDeleteProducts = async (id) => {
    try {
      const userConfirmed = window.confirm(
        t("ConfirmDeletionProductAlertMessage")
      );

      if (userConfirmed) {
        const response = await deleteProducts([id]);
        const { message } = response;
        setSuccessMessage(message);
        getProducts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewChange = (event, nextView) => {
    if (nextView !== null) {
      setViewMode(nextView);
    }
  };

  const filteredItems = useMemo(() => {
    return loadingProducts || products.length === 0
      ? []
      : applyFilters(products, filters);
  }, [loadingProducts, products, filters]);

  return (
    <WhitePaperContainer>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {successMessage && (
          <Box sx={{ pt: 2, mb: 2 }}>
            <FlashMessage message={successMessage} type="success" />
          </Box>
        )}
        <Grid
          container
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {t("ProductListPageHeadTitle")}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {t("ProductListPageHeadDesc")}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} display="flex" justifyContent="flex-end">
            <Button
              disabled={!isAdmin(user)}
              variant="contained"
              color="primary"
              component={RouterLink}
              to={ROUTES().createProduct}
            >
              {t("CreateNewProduct")}
            </Button>
          </Grid>
          <Grid item>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewChange}
              aria-label="View mode"
            >
              <ToggleButton value="list" aria-label="list">
                <ViewList />
              </ToggleButton>
              <ToggleButton value="grid" aria-label="grid">
                <ViewModule />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <FilterBar
              filters={filters}
              filtersConfig={getProductsFiltersConfig()}
              caseSensitive={false}
              onFilterChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12}>
            {loadingProducts ? (
              <Loading />
            ) : viewMode === "list" ? (
              <ProductList
                search={filters.search} // for highlighting the text
                products={filteredItems}
                handleDeleteProducts={handleDeleteProducts}
              />
            ) : (
              <ProductGrid // You need to create this component similar to ProductList but for grid view
                products={filteredItems}
                handleDeleteProducts={handleDeleteProducts}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </WhitePaperContainer>
  );
}

export default ProductListPage;
