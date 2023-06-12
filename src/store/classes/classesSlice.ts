import { createSlice } from "@reduxjs/toolkit";

import { ClassItem } from "../../types/class";
import {
  addClass,
  deleteClass,
  editClass,
  fetchClasses,
} from "./classesThunks";

// Slice for classes
interface ClassState {
  classes: ClassItem[];
  loading: boolean;
  error: string | null;
  selectedClass: ClassItem | null;
}

const initialState: ClassState = {
  classes: [],
  loading: false,
  error: null,
  selectedClass: null,
};

const classSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    selectClass(state, action) {
      state.selectedClass = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
        // return action.payload;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state) => {
        state.loading = false;
      })

      .addCase(addClass.fulfilled, (state, action) => {
        state.classes.push(action.payload);
      })
      .addCase(editClass.fulfilled, (state, action) => {
        const updatedClient = action.payload;
        const existingClientIndex = state.classes.findIndex(
          (classItem) => classItem.id === updatedClient.id
        );
        if (existingClientIndex !== -1) {
          state.classes[existingClientIndex] = updatedClient;
        }
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        const clientId = action.payload;
        state.classes = state.classes.filter(
          (classItem) => classItem.id !== clientId
        );
      });
  },
});

export const { selectClass } = classSlice.actions;

export default classSlice.reducer;
