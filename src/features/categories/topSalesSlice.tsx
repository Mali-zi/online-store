import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {IProduct, ITopSales} from '../../models/index';
import { FETCH_TOP_SALES_ERROR_MESSAGE } from '../../constants/messages';

const BASE_URL = 'http://localhost:7070/api/top-sales';

export const fetchTopSales = createAsyncThunk(
  'topSales/fetchTopSales',
  async (url: string, thunkApi) => {
    const { rejectWithValue, fulfillWithValue } = thunkApi;
          try{
          const response = await fetch(`${url}/top-sales`);
          if (!response.ok) {
              return rejectWithValue(response.status)
          }
          const data = await response.json();
          return fulfillWithValue(data)
      }catch(error){
          throw rejectWithValue(FETCH_TOP_SALES_ERROR_MESSAGE)
      }
  }
);

export const topSalesSlice = createSlice({
  name: 'topSales',
  initialState: {
    topSales: [],
    status: 'idle',
    error: {
      isError: false,
      message: '',
    },
  } as ITopSales,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopSales.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        state.status = 'fulfilled';
        if (action.payload) {
          state.topSales = action.payload;
        } else {
          state.error.isError = true;
          state.error.message = 'Ошибка 1';
        }
      })
      .addCase(fetchTopSales.pending, (state) => {
        state.status = 'pending';
      }

      )
  }
})