import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ClassItem } from "../../types/class";
import axios from "axios";

// API endpoint
const API_URL = "https://64103182e1212d9cc92c334f.mockapi.io/api/gym/classes";
// Async thunk action to fetch a single class
export const fetchClassDetails = createAsyncThunk<
  ClassItem,
  string | undefined
>("class/fetchClassDetails", async (classId) => {
  const response = await axios.get(`${API_URL}/${classId}`);
  return response.data;
});
