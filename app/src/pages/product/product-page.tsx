import {
  Box,
  Button,
  CardActions,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import PageHeader from "../../components/PageHeader/index.tsx";
import { ROUTES, SectionBorderContainer } from "../../constants/index.ts";
import fallbackProduct from "../../media/fallbackProduct.png";
import { useAppState } from "../../state/stateContext";
import { isAdmin } from "../../utils/isWho";

const ProductPage: React.FC = () => {
  const { t } = useTranslation();
  const { productId } = useParams<{ productId: string }>();
  const { user, getProducts, getProductsIsLoading, products } = useAppState();
  const [theProduct, setTheProduct] = useState<any>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (!products.length) {
      getProducts();
    }
  }, [getProducts, products.length]);

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find(({ id }) => id.toString() === productId);
      if (foundProduct) {
        setTheProduct({
          ...foundProduct,
          components: Array.isArray(foundProduct.components) ? foundProduct.components : []
        });
      }
    }
  }, [productId, products]);

  const handleCancel = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(ROUTES().productsList); // Default route if no history is available
    }
  };

  if (getProductsIsLoading || theProduct === undefined) {
    return <Loading />;
  }

  if (!theProduct) {
    return (
      <ProductContainer>
        <Typography variant="h4" gutterBottom>
          {t("404ProductNotFound")}
        </Typography>
        <Typography variant="subtitle1">
          {t("404ProductNotFoundErrorMessage")}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={ROUTES().productsList}
        >
          {t("BackToProductsList")}
        </Button>
      </ProductContainer>
    );
  }

  const renderComponentDetails = (components) => {
    if (!components || components.length === 0) {
      return (
        <Typography variant="body2">
          {t("NoComponentsAvailable")}
        </Typography>
      );
    }

    return (
      <ComponentDetails>
        {components.map((component, componentIndex) => (
          <OptionalDetails key={componentIndex}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              {component.name}
            </Typography>
            <Typography variant="body2">{component.description}</Typography>
            <Typography variant="body2" sx={{ color: "primary.main", fontWeight: "bold" }}>
              {t("Price")}: €{component.price}
            </Typography>
          </OptionalDetails>
        ))}
      </ComponentDetails>
    );
  };

  // Ensure components are arrays
  const components = Array.isArray(theProduct.components) ? theProduct.components : [];

  return (
    <>
      <Container maxWidth={'lg'}>
        <PageHeader title={`${theProduct.name}`} description={t("ProductPageDescription")} margin={'0'} />
        <SectionBorderContainer>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <MediaWrapper>
                <ProductMedia
                  image={theProduct.imgUrl || fallbackProduct}
                  title={theProduct.name}
                />
                <PreviewGallery>
                  <img src={theProduct.imgUrl || fallbackProduct} alt="Preview" style={{ height: '80px', marginRight: '0.5rem' }} />
                </PreviewGallery>
              </MediaWrapper>
            </Grid>
            <Grid item xs={12} md={6}>
              <CardActions sx={{ justifyContent: 'space-between', mb: 2 }}>
                <Button variant="outlined" onClick={handleCancel}>
                  {t("Back")}
                </Button>
                <Button
                  disabled={!isAdmin(user)}
                  variant="contained"
                  component={Link}
                  to={ROUTES(productId).editProduct}
                >
                  {t("EditProduct")}
                </Button>
              </CardActions>
              <ProductPaper>
                <Typography gutterBottom variant="h5" component="h2">
                  {theProduct.name} <Typography variant="body2" component="span">({t("ID")}: {theProduct.id})</Typography>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <ReactMarkdown>{theProduct.description}</ReactMarkdown>
                </Typography>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', mt: 2 }}>
                  {t("Price")}: €{theProduct.price}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  {t("Category")}: {theProduct.category}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  {t("Company")}: {theProduct.company === 'sermixer' ? t('Sermixer') : t('S2Truckervice')}
                </Typography>
                <Divider sx={{ my: 2 }}>{t('Components')}</Divider>
                {renderComponentDetails(components)}
              </ProductPaper>
            </Grid>
          </Grid>
        </SectionBorderContainer>
      </Container>
    </>
  );
};

export default ProductPage;

const ProductContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const ProductPaper = styled("div")(() => ({
  padding: '1rem',
  display: "flex",
  flexDirection: "column",
  gap: '1rem',
  background: '#fff',
  border: '2px solid #F4F4F4'
}));

const MediaWrapper = styled("div")(({ theme }) => ({
  position: "sticky",
  top: 20,
  borderRadius: '.2rem',
  minHeight: "calc(50vh)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  border: "2px solid #F4F4F4",
  padding: "1rem",
  "&:hover": {
    opacity: 0.9,
  },
}));

const ProductMedia = styled(CardMedia)(({ theme }) => ({
  flexGrow: 1,
  width: "100%",
  objectFit: "cover",
  height: 0,
  paddingTop: "100%",
}));

const PreviewGallery = styled(Box)`
  display: flex;
  margin-top: 1rem;
  overflow-x: auto;
`;

const OptionalDetails = styled(Box)`
  padding: 8px;
  border-radius: 4px;
`;

const ComponentDetails = styled(Box)`
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 8px;
`;
