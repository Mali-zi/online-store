import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {IProduct, ICategory, IProducts} from '../../models/index';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (url: string, thunkApi) => {
    const { rejectWithValue, fulfillWithValue } = thunkApi;
          try{
          const response = await fetch(`${url}/items`);
          if (!response.ok) {
              return rejectWithValue(response.status)
          }
          const data = await response.json();
          return fulfillWithValue(data)
      }catch(error){
          throw rejectWithValue('Oops! Something went wrong. Try again!')
      }
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    productsList: [],
    statusProducts: 'idle',
    errorProducts: null,
  } as IProducts,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        state.statusProducts = 'fulfilled';
        if (action.payload) {
          state.productsList = action.payload;
        } else {
          state.errorProducts = 'Ошибка-3!'
        }
      })
      .addCase(fetchProducts.pending, (state) => {
        state.statusProducts = 'pending';
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.statusProducts = 'rejected';
        if (action.payload) {
          state.errorProducts = action.payload;
        } else {
          state.errorProducts = 'Oops! Something went wrong. Try again!'
        };
      })

  }
})

export default productsSlice.reducer;