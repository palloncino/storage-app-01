import { useState, useCallback } from "react";
import { request } from "../utils/request.ts";

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  // getProducts
  const [getProductsIsLoading, setGetProductsIsLoading] = useState(false);
  const [getProductsError, setGetProductsError] = useState(null);

  // addProduct
  const [addProductIsLoading, setAddProductIsLoading] = useState(false);
  const [addProductError, setAddProductError] = useState(null);

  // editProduct
  const [editProductIsLoading, setEditProductIsLoading] = useState(false);
  const [editProductError, setEditProductError] = useState(null);

  // deleteProduct
  const [deleteProductIsLoading, setDeleteProductIsLoading] = useState(false);
  const [deleteProductError, setDeleteProductError] = useState(null);

  const getProducts = useCallback(async () => {
    setGetProductsIsLoading(true);
    try {
      const data = await request({
        url: `${process.env.REACT_APP_API_URL}/products/get-products`,
      });
      setProducts(data);
      setGetProductsError(null);
    } catch (err) {
      setGetProductsError(err);
    } finally {
      setGetProductsIsLoading(false);
    }
  }, []);

  const addProduct = async (newProduct) => {
    setAddProductIsLoading(true);
    try {
      const data = await request({
        url: `${process.env.REACT_APP_API_URL}/products/create-product`,
        method: "POST",
        body: newProduct,
      });
      // Optionally refresh the products list or add directly to state
      setProducts((prev) => [...prev, data]);
      return data;
    } catch (error) {
      setAddProductError(error.message);
    } finally {
      setAddProductIsLoading(false);
    }
  };

  const editProduct = async (editedProduct) => {
    setEditProductIsLoading(true);
    try {
      const data = await request({
        url: `${process.env.REACT_APP_API_URL}/products/edit-product`,
        method: "PUT",
        body: editedProduct
      });
      setProducts((prev) => prev.map((p) => (p.id === data.id ? data : p)));
      return data;
    } catch (err) {
      console.error("Error updating product:", err);
      setEditProductError(err);
    } finally {
      setEditProductIsLoading(false);
    }
  };

  const deleteProducts = async (productIds = []) => {
    setDeleteProductIsLoading(true);
    try {
      const response = await request({
        url: `${process.env.REACT_APP_API_URL}/products/delete-products`,
        method: "DELETE",
        body: { ids: productIds },
      });
      const deletedIds = response.ids;
      setProducts((prev) => prev.filter((p) => !deletedIds.includes(p.id)));
      return response;
    } catch (err) {
      setDeleteProductError(err);
    } finally {
      setDeleteProductIsLoading(false);
    }
  };

  return {
    products,
    getProducts,
    getProductsIsLoading,
    getProductsError,
    addProduct,
    addProductIsLoading,
    setAddProductError,
    addProductError,
    editProduct,
    editProductIsLoading,
    editProductError,
    deleteProducts,
    deleteProductIsLoading,
    deleteProductError,
  };
};
