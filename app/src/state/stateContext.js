import React, { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth.ts";
import { useClients } from "../hooks/useClients.ts";
import { useProducts } from "../hooks/useProducts.js";
import { useUsers } from "../hooks/useUsers.js";

const AppStateContext = createContext();

export function useAppState() {
  return useContext(AppStateContext);
}

export const AppStateProvider = ({ children }) => {
  const {
    user,
    token,
    isLoadingAuthorization,
    logout,
    login,
    loginIsLoading,
    loginError,
    signup,
    signupIsLoading,
    signupError,
    signupSuccessMessage,
  } = useAuth();

  const {
    users,
    getUsers,
    getUsersIsLoading,
    getUsersError,
    addUser,
    addUserIsLoading,
    addUserError,
    editUser,
    editUserIsLoading,
    editUserError,
    deleteUsers,
    deleteUserIsLoading,
    deleteUserError,
  } = useUsers();

  const {
    clients,
    getClients,
    getClientsIsLoading,
    getClientsError,
    addClient,
    addClientIsLoading,
    addClientError,
    editClient,
    editClientIsLoading,
    editClientError,
    deleteClients,
    deleteClientIsLoading,
    deleteClientError,
  } = useClients();

  const {
    products,
    getProducts,
    getProductsIsLoading,
    getProductsError,
    addProduct,
    addProductIsLoading,
    addProductError,
    setAddProductError,
    editProduct,
    editProductIsLoading,
    editProductError,
    deleteProducts,
    deleteProductIsLoading,
    deleteProductError,
  } = useProducts();

  const state = {
    /*
      Auth
    */
    user,
    token,
    isLoadingAuthorization,
    logout,
    login,
    loginIsLoading,
    loginError,
    signup,
    signupIsLoading,
    signupError,
    signupSuccessMessage,
    /*
      Products
    */
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
    /*
      Users
    */
    users,
    getUsers,
    getUsersIsLoading,
    getUsersError,
    addUser,
    addUserIsLoading,
    addUserError,
    editUser,
    editUserIsLoading,
    editUserError,
    deleteUsers,
    deleteUserIsLoading,
    deleteUserError,
    /*
      Clients
    */
    clients,
    getClients,
    getClientsIsLoading,
    getClientsError,
    addClient,
    addClientIsLoading,
    addClientError,
    editClient,
    editClientIsLoading,
    editClientError,
    deleteClients,
    deleteClientIsLoading,
    deleteClientError,
  };

  return (
    <AppStateContext.Provider value={state}>
      {children}
    </AppStateContext.Provider>
  );
};
