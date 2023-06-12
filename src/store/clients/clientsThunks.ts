import { createAsyncThunk } from "@reduxjs/toolkit";
import { Client } from "../../types/client";
import axios from "axios";

interface AddClientPayload {
  name: string;
  phoneNumber: string;
  address: string;
  subscriptionType: string;
}

interface EditClientPayload {
  name: string;
  phoneNumber: string;
  address: string;
  subscriptionType: string;
  createdAt?: string | undefined;
  full_name?: string | undefined;
  avatar?: string | undefined;
  subscription_plan?: string | undefined;
  mobile_number?: string | undefined;
  id?: string | undefined;
  subcsription_plan?: string | undefined;
}

// API endpoint
const API_URL = "https://64103182e1212d9cc92c334f.mockapi.io/api/gym/clients";

// Async thunk action to fetch clients
export const fetchClients = createAsyncThunk<Client[]>(
  "clients/fetchClients",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

// Async thunk action to fetch a single client
export const fetchClientDetails = createAsyncThunk<Client, string>(
  "client/fetchClientDetails",
  async (clientId) => {
    const response = await axios.get(`${API_URL}/${clientId}`);
    return response.data;
  }
);

// Async thunk action to add a client
export const addClient = createAsyncThunk<Client, AddClientPayload>(
  "clients/addClient",
  async (client) => {
    const response = await axios.post(API_URL, client);
    return response.data;
  }
);

// Async thunk action to edit a client
export const editClient = createAsyncThunk<Client, EditClientPayload>(
  "clients/editClient",
  async (updatedClient) => {
    const url = `${API_URL}/${updatedClient.id}`;
    const response = await axios.put(url, updatedClient);
    return response.data;
  }
);

// Async thunk action to delete a client
export const deleteClient = createAsyncThunk<string, string>(
  "clients/deleteClient",
  async (clientId) => {
    await axios.delete(`${API_URL}/${clientId}`);
    return clientId;
  }
);
