import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IProduct, ITopSales } from '../../models/product';

export const fetchTopSales = createAsyncThunk('topSales/fetchTopSales', async (url: string, thunkApi) => {
  const { rejectWithValue, fulfillWithValue } = thunkApi;
  try {
    const response = await fetch(`${url}/top-sales`);
    if (!response.ok) {
      return rejectWithValue(response.status);
    }
    const data = await response.json();
    return fulfillWithValue(data);
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.message);
  }
});

export const topSalesSlice = createSlice({
  name: 'topSales',
  initialState: {
    topSalesList: [],
    statusTopSales: 'idle',
    errorTopSales: null,
  } as ITopSales,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchTopSales.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        state.statusTopSales = 'fulfilled';
        if (action.payload) {
          state.topSalesList = action.payload;
        } else {
          state.errorTopSales = 'Хиты продаж не могут быть загружены.';
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
          state.errorTopSales = 'Ошибка при загрузке хитов продаж.';
        }
      });
  },
});

export default topSalesSlice.reducer;
