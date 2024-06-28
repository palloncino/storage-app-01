import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Divider, Grid, IconButton, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Paper } from "@mui/material";
import React, { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import fallbackProductImg from "../../media/fallbackProduct.png";
import { ProductFormProps, ProductType } from "../../types/index.ts";
import EuroTextField from '../EuroTextField/index.tsx';
import FlashMessage from "../FlashMessage";
import MarkdownEditor from "../MarkdownEditor/index.tsx";

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
`;

const Section = styled(Paper)`
  padding: 2rem;
  margin-bottom: 2rem;
`;

const ImagePreview = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  img {
    border-radius: 8px;
    max-width: 100%;
    height: auto;
  }
`;

const ComponentContainer = styled(Paper)`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const ComponentInputContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
`;

const StyledTextField = styled(TextField)`
  background: #fff;
`;

const ProductForm: FC<ProductFormProps> = ({
    initialProduct,
    onSave,
    loading,
    errorMessage,
    successMessage,
}) => {
    const { t } = useTranslation();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [product, setProduct] = useState<ProductType>({
        ...initialProduct,
        components: initialProduct.components || [],
    });
    const [previewUrl, setPreviewUrl] = useState<string>(initialProduct.imgUrl || "");
    const navigate = useNavigate();

    useEffect(() => {
        if (successMessage) {
            setProduct(initialProduct);
            setPreviewUrl(initialProduct.imgUrl || "");
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    }, [successMessage, initialProduct]);

    useEffect(() => {
        setPreviewUrl(initialProduct.imgUrl || "");
    }, [initialProduct]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;

        if (!name) {
            return
        }
        const [key, index, field] = name!.split('-');

        if (key === "component") {
            updateComponentField(index, field, value as string);
        } else {
            setProduct({ ...product, [name!]: value as string });
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name!]: value as string });
    };

    const handlePriceChange = (value: string) => {
        setProduct({ ...product, price: value });
    };

    const updateComponentField = (index: string, field: string, value: string) => {
        const updatedComponents = product.components.map((component, i) =>
            i === parseInt(index) ? { ...component, [field]: value } : component
        );
        setProduct({ ...product, components: updatedComponents });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const imgBase64 = reader.result as string;
                setProduct({ ...product, imgUrl: imgBase64 });
                setPreviewUrl(imgBase64);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddComponent = () => {
        setProduct({
            ...product,
            components: [...product.components, { name: "", price: 0, description: "" }],
        });
    };

    const handleRemoveComponent = (index: number) => {
        setProduct({
            ...product,
            components: product.components.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(product);
    };

    return (
        <FormContainer>
            {errorMessage && <FlashMessage message={errorMessage} type="error" />}
            {successMessage && <FlashMessage message={successMessage} type="success" />}

            <Box mt={2} display="flex" justifyContent="space-between" gap="1rem">
                <Button variant="outlined" color="primary" disabled={loading} onClick={() => navigate(-1)}>
                    {t("Back")}
                </Button>
                <Button type="submit" variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
                    {t("Save")}
                </Button>
            </Box>

            <Section elevation={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <ImagePreview>
                            <img src={previewUrl || fallbackProductImg} alt="Preview" />
                            <Button variant="contained" component="label" sx={{ mt: 2 }}>
                                {t("UploadImage")}
                                <input type="file" hidden ref={fileInputRef} onChange={handleImageChange} />
                            </Button>
                        </ImagePreview>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <StyledTextField
                            label={t("Name")}
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        {/* <StyledTextField
                            label={t("Description")}
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                        /> */}
                        <MarkdownEditor
                            label={t("Description")}
                            name="description"
                            value={product.description}
                            onChange={e => {
                                const newEvent = { target: { name: "description", value: e } }
                                handleChange(newEvent as React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>)
                            }}
                            readOnly={false}
                        />
                        <EuroTextField
                            label={t("Price")}
                            value={product.price}
                            onChange={handlePriceChange}
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>{t("Category")}</InputLabel>
                            <Select
                                label={t("Category")}
                                name="category"
                                value={product.category}
                                onChange={handleSelectChange}
                            >
                                <MenuItem value="Vasca">{t("Vasca")}</MenuItem>
                                <MenuItem value="Cifa">{t("Cifa")}</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>{t("Company")}</InputLabel>
                            <Select
                                label={t("Company")}
                                name="company"
                                value={product.company}
                                onChange={handleSelectChange}
                            >
                                <MenuItem value="sermixer">{t("Sermixer")}</MenuItem>
                                <MenuItem value="s2_truck_service">{t("S2TruckService")}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Section>

            <Section elevation={3}>
                <Divider>{t("Components")}</Divider>
                {product.components.map((component, index) => (
                    <ComponentContainer key={index} elevation={1}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="subtitle1">
                                {t("Component")} {index + 1}
                            </Typography>
                            <IconButton onClick={() => handleRemoveComponent(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                        <ComponentInputContainer>
                            <StyledTextField
                                label={t("ComponentName")}
                                name={`component-${index}-name`}
                                value={component.name}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <StyledTextField
                                label={t("ComponentDescription")}
                                name={`component-${index}-description`}
                                value={component.description}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                multiline
                                rows={2}
                            />
                            <EuroTextField
                                label={t("ComponentPrice")}
                                value={component.price}
                                onChange={(value) => updateComponentField(index.toString(), 'price', value)}
                                margin="normal"
                            />
                        </ComponentInputContainer>
                    </ComponentContainer>
                ))}
                <Box mt={2} textAlign="right">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleAddComponent}
                        startIcon={<AddIcon />}
                    >
                        {t("AddComponent")}
                    </Button>
                </Box>
            </Section>
        </FormContainer>
    );
};

export default ProductForm;
