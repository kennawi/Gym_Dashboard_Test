import { createSlice } from "@reduxjs/toolkit";

import { ClassItem } from "../../types/class";
import { fetchClassDetails } from "./classThunks";

interface ClientState {
  classItem: ClassItem | null;
  loading: boolean;
  error: string | null;
}

const initialState: ClientState = {
  classItem: null,
  loading: false,
  error: null,
};

const classSlice = createSlice({
  name: "class",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClassDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.classItem = action.payload;
      })
      .addCase(fetchClassDetails.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export default classSlice.reducer;
