import { createSlice } from '@reduxjs/toolkit'
import { getProductById, getProducts } from '../api/getResourceAsyncThunk.js';
import { STATUSES } from '../constants/constants.js';
import { postProducts } from '../api/postResourceAsyncThunk.js';
import { putProducts } from '../api/putResourceAsyncThunk.js';

const initialState = {
  value:[],
  status:STATUSES.IDLE
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  extraReducers:(builder)=>
  {
    builder.addCase( getProducts.pending , (state, action)=>
    {
        state.status=STATUSES.PENDING;
    })

    builder.addCase( getProducts.fulfilled , (state, action)=>
    {
        state.status=STATUSES.SUCCESS;
        state.value=action.payload;
    })

    builder.addCase( getProducts.rejected , (state, action)=>
    {
        state.status=STATUSES.REJECTED;
        state.error=action.error;
    })

    builder.addCase( postProducts.pending , (state, action)=>
    {
        state.status=STATUSES.PENDING;
    })

    builder.addCase( postProducts.fulfilled , (state, action)=>
    {
        state.status=STATUSES.SUCCESS;
    })

    builder.addCase( postProducts.rejected , (state, action)=>
    {
        state.status=STATUSES.REJECTED;
        state.error=action.error;
    })

    builder.addCase( putProducts.fulfilled , (state, action)=>
    {
        state.status=STATUSES.SUCCESS;
    })

    builder.addCase( putProducts.rejected , (state, action)=>
    {
        state.status=STATUSES.REJECTED;
        state.error=action.error;
    })

    builder.addCase( getProductById.fulfilled , (state, action)=>
    {
        state.status=STATUSES.SUCCESS;
        state.editData=action.payload;
    })

    builder.addCase( getProductById.rejected , (state, action)=>
    {
        state.status=STATUSES.REJECTED;
        state.error=action.error;
    })

  }
})

export default productsSlice.reducer;