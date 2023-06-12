import { createSlice } from "@reduxjs/toolkit";

import { Client } from "../../types/client";
import {
  addClient,
  deleteClient,
  editClient,
  fetchClients,
} from "./clientsThunks";

interface ClientState {
  clients: Client[];

  loading: boolean;
  selectedClient: Client | null;
  error: string | null;
}

const initialState: ClientState = {
  clients: [],
  selectedClient: null as Client | null,
  loading: false,
  error: null,
};
// Slice for clients
const clientSlice = createSlice({
  name: "clients",
  initialState,

  reducers: {
    selectClient(state, action) {
      state.selectedClient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        // return action.payload;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(addClient.fulfilled, (state, action) => {
        state.clients.push(action.payload);
      })
      .addCase(editClient.fulfilled, (state, action) => {
        const updatedClient = action.payload;
        const existingClientIndex = state.clients.findIndex(
          (client) => client.id === updatedClient.id
        );
        if (existingClientIndex !== -1) {
          state.clients[existingClientIndex] = updatedClient;
        }
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        const clientId = action.payload;
        state.clients = state.clients.filter(
          (client) => client.id !== clientId
        );
      });
  },
});

export const { selectClient } = clientSlice.actions;

export default clientSlice.reducer;
