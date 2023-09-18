import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (filterData='') => {
      console.log(filterData)
      const response = await axios.get('http://localhost:3000/products'+filterData)
      return response.data;
    }
  )


export const getProductById = createAsyncThunk(
    'products/getProductById',
   async (id) => {
    const response = await axios.get('http://localhost:3000/products/'+id)
      return response.data;
    }
  )