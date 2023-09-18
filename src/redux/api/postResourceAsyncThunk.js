import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const postProducts = createAsyncThunk(
    'products/postProducts',
    async (data) => {
      const response = await axios.post('http://localhost:3000/products', data);
      return response.data;
    }
  )