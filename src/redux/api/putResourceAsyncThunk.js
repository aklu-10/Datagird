import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const putProducts = createAsyncThunk(
    'products/putProducts',
    async ({id, body}) => {
      const response = await axios.put('http://localhost:3000/products/'+id, body);
      return response.data;
    }
  )