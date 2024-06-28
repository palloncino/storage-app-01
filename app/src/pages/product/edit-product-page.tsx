import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import PageHeader from "../../components/PageHeader/index.tsx";
import ProductForm from "../../components/ProductForm/index.tsx";
import { SectionBorderContainer } from "../../constants/index.ts";
import { useAppState } from "../../state/stateContext";
import { ProductType } from "../../types/index.ts";
import { dataURLtoFile } from "../../utils/base64Utils.ts";
import { WhitePaperContainer } from "../../styled-components/index.tsx";

const EditProductPage = () => {
  const { t } = useTranslation();
  const { productId } = useParams<{ productId: string }>();
  const { editProduct, editProductError, products, getProducts, getProductsIsLoading } = useAppState();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>("");

  useEffect(() => {
    if (productId && products.length > 0) {
      const productData = products.find((product) => product.id.toString() === productId);
      if (productData) {
        setProduct(productData);
        setLoading(false);
      } else {
        console.error("Product not found");
        setLoading(false);
      }
    } else if (products.length === 0) {
      setLoading(false);
      console.error("Products list is empty, fetching products ...");
      getProducts();
    }
  }, [productId, products, getProducts]);

  const handleSave = async (product: ProductType) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('id', product.id.toString());
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('category', product.category);
    formData.append('company', product.company || ""); // Ensure company is included
    formData.append('components', JSON.stringify(product.components || [])); // Ensure components is an array
    if (product.imgUrl && product.imgUrl.startsWith('data:image')) {
      const file = dataURLtoFile(product.imgUrl, 'image.jpg');
      formData.append('image', file);
    }

    try {
      const returnedProduct = await editProduct(formData);
      setMessage(
        `Successfully updated item ${returnedProduct.name}, ID: ${returnedProduct.id}.`
      );
    } catch (error) {
      console.error("Failed to update product:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <WhitePaperContainer>
      <Container maxWidth={'lg'}>
        <PageHeader title={t("EditProductPageTitle")} description={t("EditProductPageDescription")} margin={'0'} />
        <SectionBorderContainer>
          {product ? (
            <ProductForm
              initialProduct={product}
              onSave={handleSave}
              loading={loading}
              errorMessage={editProductError ? editProductError.toString() : ""}
              successMessage={message}
            />
          ) : (
            getProductsIsLoading ? (
              <Loading />
            ) : (
              <Typography variant="h6" color="error">
                {t("ProductNotFound")}
              </Typography>
            )
          )}
        </SectionBorderContainer>
      </Container>
    </WhitePaperContainer>
  );
};

export default EditProductPage;
