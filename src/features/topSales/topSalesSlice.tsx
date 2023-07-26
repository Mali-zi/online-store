import { PayloadAction,  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {IProduct, ITopSales} from '../../models/index';

export const fetchTopSales = createAsyncThunk(
  'topSales/fetchTopSales',
  async (url: string, thunkApi) => {
    const { rejectWithValue, fulfillWithValue } = thunkApi;
          try{
          const response = await fetch(`${url}/top-sales`);
          console.log('response.type =', response.type);
          console.log('response.url =', response.url);
          console.log('response.status =', response.status);
          console.log('response.ok =', response.ok);
          console.log('response.statusText =', response.statusText);
          console.log('response.headers =', response.headers);
          if (!response.ok) {
              return rejectWithValue(response.status)
          }
          const data = await response.json();
          return fulfillWithValue(data)
      }catch(error: any){
        if (!error.response) {
          throw error
        }
        return rejectWithValue(error.message)
      }
  }
);

export const topSalesSlice = createSlice({
  name: 'topSales',
  initialState: {
    topSalesList: [],
    statusTopSales: 'idle',
    errorTopSales: null,
  } as ITopSales,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopSales.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        state.statusTopSales = 'fulfilled';
        if (action.payload) {
          state.topSalesList = action.payload;
        } else {
          state.errorTopSales = 'Ошибка 1';
        }
      })
      .addCase(fetchTopSales.pending, (state) => {
        state.statusTopSales = 'pending';
      })
      .addCase(fetchTopSales.rejected, (state, action) => {
        state.statusTopSales = 'rejected';
        if (action.payload) {
          state.errorTopSales = action.payload;
        } else {
          state.errorTopSales = 'Oops! Something went wrong. Try again!';
        };
      })
  }
})

export default topSalesSlice.reducer;