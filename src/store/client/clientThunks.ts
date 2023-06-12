import { createAsyncThunk } from "@reduxjs/toolkit";
import { Client } from "../../types/client";
import axios from "axios";

// API endpoint
const API_URL = "https://64103182e1212d9cc92c334f.mockapi.io/api/gym/clients";
// Async thunk action to fetch a single client
export const fetchClientDetails = createAsyncThunk<Client, string | undefined>(
  "client/fetchClientDetails",
  async (clientId) => {
    const response = await axios.get(`${API_URL}/${clientId}`);
    return response.data;
  }
);
