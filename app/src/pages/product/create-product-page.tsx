import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Loading from "../../components/Loading/index.js";
import PageHeader from "../../components/PageHeader/index.tsx";
import ProductForm from "../../components/ProductForm/index.tsx";
import { useAppState } from "../../state/stateContext.js";
import { ProductType } from "../../types/index.ts"; // Ensure this path matches your project structure
import { dataURLtoFile } from "../../utils/base64Utils.ts";
import { Container } from "@mui/material";

const CreateProductPage: React.FC = () => {
  const { t } = useTranslation();
  const { addProduct, addProductError } = useAppState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const initialProduct: ProductType = {
    id: 0, // This will be assigned by the backend
    name: "",
    description: "",
    price: "",
    category: "",
    company: "", // Ensure company is initialized
    imgUrl: "",
    components: [], // Ensure components is an array
    previewUrl: "", // This is for frontend use only
  };

  const handleSave = async (product: ProductType) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('id', product.id.toString());
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('category', product.category);
    formData.append('company', product.company || ""); // Handle undefined company
    formData.append('components', JSON.stringify(product.components || [])); // Ensure components is an array
    if (product.imgUrl && product.imgUrl.startsWith('data:image')) {
      const file = dataURLtoFile(product.imgUrl, 'image.jpg');
      formData.append('image', file);
    }

    try {
      const returnedProduct = await addProduct(formData); // or editProduct(formData)
      setMessage(
        `Successfully created/updated item ${returnedProduct.name}, ID: ${returnedProduct.id}.`
      );
    } catch (error) {
      console.error("Failed to add/update product:", error);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Container>
        <PageHeader title={t('CreateProduct')} margin={'0'} />
        <ProductForm
          initialProduct={initialProduct}
          onSave={handleSave}
          loading={loading}
          errorMessage={addProductError}
          successMessage={message}
        />
      </Container>
    </>
  );
};

export default CreateProductPage;
