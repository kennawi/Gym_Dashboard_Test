import { createSlice } from "@reduxjs/toolkit";
import { Client } from "../../types/client";
import { fetchClientDetails } from "./clientThunks";

interface ClientState {
  client: Client | object;
  loading: boolean;
  error: string | null;
}

const initialState: ClientState = {
  client: {},
  loading: false,
  error: null,
};

const clientSlice = createSlice({
  name: "client",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.client = action.payload;
      })
      .addCase(fetchClientDetails.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export default clientSlice.reducer;
