import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Class } from "../../types/class";

interface ClassState {
  classes: Class[];
  loading: boolean;
  error: string | null;
  selectedClass: Class | null;
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
    fetchClassesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchClassesSuccess(state, action: PayloadAction<Class[]>) {
      state.loading = false;
      state.classes = action.payload;
    },
    fetchClassesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addClass(state, action: PayloadAction<Class>) {
      state.classes.push(action.payload);
    },
    selectedClass(state: ClassState, action: PayloadAction<Class>) {
      state.selectedClass = action.payload;
    },

    editClass(state, action: PayloadAction<Class>) {
      const updatedClass = action.payload;
      const index = state.classes.findIndex(
        (classItem) => classItem.id === updatedClass.id
      );
      if (index !== -1) {
        state.classes[index] = updatedClass;
      }
    },
    deleteClass(state, action: PayloadAction<string>) {
      const classId = action.payload;
      state.classes = state.classes.filter(
        (classItem) => classItem.id !== classId
      );
    },
  },
});

export const {
  fetchClassesStart,
  fetchClassesSuccess,
  fetchClassesFailure,
  addClass,
  editClass,
  deleteClass,
  selectedClass,
} = classSlice.actions;

export default classSlice.reducer;
