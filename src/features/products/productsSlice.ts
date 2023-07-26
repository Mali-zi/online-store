import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {IProduct, ICategory, IProducts, ISelectedProduct} from '../../models/index';

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

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (url: string, thunkApi) => {
    const { rejectWithValue, fulfillWithValue } = thunkApi;
          try{
          const response = await fetch(`${url}/categories`);
          if (!response.ok) {
              return rejectWithValue(response.status)
          }
          const data = await response.json();
          return fulfillWithValue(data)
      }catch(error: any){
          throw rejectWithValue('Oops! Something went wrong. Try again!')
      }
  }
);

const initialSelectedCategory: ICategory = {
  id: '',
  title: '',
};

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    productsList: [],
    categories: [],
    selectedCategory: initialSelectedCategory,
    status: 'idle',
    error: null,
  } as IProducts,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        state.status = 'fulfilled';
        if (action.payload) {
          state.productsList = action.payload;
        } else {
          state.error.message = 'Ошибка-1!'
        }
      })
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.error = action.payload;
        };
      })

      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        state.status = 'fulfilled';
        if (action.payload) {
          state.categories = action.payload;
        } else {
          state.error.message = 'Ошибка-1!'
        }
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.error = action.payload;
        };
      })

  }
})

export default productsSlice.reducer;