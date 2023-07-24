import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {IProduct, ICategory, IProducts} from '../../models/index';

export const fetchTopSales = createAsyncThunk(
  'products/fetchTopSales',
  async (url: string, thunkApi) => {
    const { rejectWithValue, fulfillWithValue } = thunkApi;
          try{
          const response = await fetch(url);
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
          const response = await fetch(url);
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

const initialProduct: IProduct = {
  id: '',
  category: '',
  title: '',
  price: '',
  images: [],
};

const initialSelectedCategory: ICategory = {
  id: '',
  title: '',
};

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    selectedProduct: initialProduct,
    categories: [],
    selectedCategory: initialSelectedCategory,
    status: 'idle',
    error: {
      isError: false,
      message: '',
    },
  } as IProducts,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopSales.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        state.status = 'fulfilled';
        if (action.payload) {
          state.topSales = action.payload;
        } else {
          state.error = 'Ошибка-1!'
        }
      }

      )
  }
})