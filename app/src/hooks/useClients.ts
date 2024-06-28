import { useState, useCallback } from "react";
import { request } from "../utils/request.ts";
import { ClientType } from "../types";

export const useClients = () => {
  const [clients, setClients] = useState<ClientType[]>([]);

  // getClients
  const [getClientsIsLoading, setGetClientsIsLoading] = useState(false);
  const [getClientsError, setGetClientsError] = useState<string | null>(null);

  // addClient
  const [addClientIsLoading, setAddClientIsLoading] = useState(false);
  const [addClientError, setAddClientError] = useState<string | null>(null);

  // editClient
  const [editClientIsLoading, setEditClientIsLoading] = useState(false);
  const [editClientError, setEditClientError] = useState<string | null>(null);

  // deleteClient
  const [deleteClientIsLoading, setDeleteClientIsLoading] = useState(false);
  const [deleteClientError, setDeleteClientError] = useState<string | null>(null);

  const getClients = useCallback(async () => {
    setGetClientsIsLoading(true);
    try {
      const data = await request({
        url: `${process.env.REACT_APP_API_URL}/clients/get-clients`,
      });
      setClients(data);
      setGetClientsError(null);
    } catch (err) {
      setGetClientsError(err.message);
    } finally {
      setGetClientsIsLoading(false);
    }
  }, []);

  const addClient = async (newClient: ClientType) => {
    setAddClientIsLoading(true);
    try {
      const data = await request({
        url: `${process.env.REACT_APP_API_URL}/clients/create-client`,
        method: "POST",
        body: newClient,
      });
      setClients((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setAddClientError(err.message);
    } finally {
      setAddClientIsLoading(false);
    }
  };

  const editClient = async (editedClient: ClientType) => {
    setEditClientIsLoading(true);
    try {
      const data = await request({
        url: `${process.env.REACT_APP_API_URL}/clients/edit-client`,
        method: "PUT",
        body: editedClient,
      });
      setClients((prev) => prev.map((c) => (c.id === data.id ? data : c)));
      return data;
    } catch (err) {
      console.error("Error updating client:", err);
      setEditClientError(err.message);
    } finally {
      setEditClientIsLoading(false);
    }
  };

  const deleteClients = async (clientIds: number[]) => {
    setDeleteClientIsLoading(true);
    try {
      const response = await request({
        url: `${process.env.REACT_APP_API_URL}/clients/delete-clients`,
        method: "DELETE",
        body: { ids: clientIds },
      });
      const deletedIds = response.ids;
      setClients((prev) => prev.filter((c) => !deletedIds.includes(c.id)));
      return response;
    } catch (err) {
      setDeleteClientError(err.message);
    } finally {
      setDeleteClientIsLoading(false);
    }
  };

  return {
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
};
