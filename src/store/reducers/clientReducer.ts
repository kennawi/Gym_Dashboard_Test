import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "../../types/client";

interface ClientState {
  clients: Client[];
  loading: boolean;
  selectedClient: Client | null;
  error: string | null;
}

const initialState: ClientState = {
  clients: [],
  selectedClient: null,
  loading: false,
  error: null,
};

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    fetchClientsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchClientsSuccess(state, action: PayloadAction<Client[]>) {
      state.loading = false;
      state.clients = action.payload;
    },
    fetchClientsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addClient(state, action: PayloadAction<Client>) {
      state.clients.push(action.payload);
    },
    selectClient(state: ClientState, action: PayloadAction<Client | null>) {
      state.selectedClient = action.payload;
    },
    editClient(state, action: PayloadAction<Client>) {
      const updatedClient = action.payload;
      const index = state.clients.findIndex(
        (client) => client.id === updatedClient.id
      );
      if (index !== -1) {
        state.clients[index] = updatedClient;
      }
    },
    deleteClient(state, action: PayloadAction<string>) {
      const clientId = action.payload;
      state.clients = state.clients.filter((client) => client.id !== clientId);
    },
  },
});

export const {
  fetchClientsStart,
  fetchClientsSuccess,
  fetchClientsFailure,
  addClient,
  editClient,
  deleteClient,
  selectClient,
} = clientSlice.actions;

export default clientSlice.reducer;
