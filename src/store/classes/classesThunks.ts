import { createAsyncThunk } from "@reduxjs/toolkit";
import { ClassItem } from "../../types/class";
import axios from "axios";

interface AddClassPayload {
  title: string;
  coach_name: string;
  timing: string;
  price: string;
}

interface EditClassPayload {
  title: string;
  coach_name: string;
  timing: string;
  price: string;

  image?: string | undefined;
  description?: string | undefined;
  coach_brief?: string | undefined;
  createdAt?: string | undefined;
  id?: string | undefined;
  class_name?: string | undefined;
}

// API endpoint
const API_URL = "https://64103182e1212d9cc92c334f.mockapi.io/api/gym/classes";

// Async thunk action to fetch classes
export const fetchClasses = createAsyncThunk<ClassItem[]>(
  "classes/fetchClasses",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

// Async thunk action to add a class
export const addClass = createAsyncThunk<ClassItem, AddClassPayload>(
  "classes/addClass",
  async (classItem) => {
    const response = await axios.post(API_URL, classItem);
    return response.data;
  }
);

// Async thunk action to edit a class
export const editClass = createAsyncThunk<ClassItem, EditClassPayload>(
  "classes/editClass",
  async (updatedClass) => {
    const url = `${API_URL}/${updatedClass.id}`;
    const response = await axios.put(url, updatedClass);
    return response.data;
  }
);

// Async thunk action to delete a class
export const deleteClass = createAsyncThunk<string, string>(
  "classes/deleteClass",
  async (classId) => {
    await axios.delete(`${API_URL}/${classId}`);
    return classId;
  }
);
