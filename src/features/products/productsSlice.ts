import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {IProduct, IProducts} from '../../models/index';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (url: string, thunkApi) => {
    const { rejectWithValue, fulfillWithValue } = thunkApi;
          try{
          const response = await fetch(url);
          if (!response.ok) {
              return rejectWithValue(response.status)
          }
          const data = await response.json();
          return fulfillWithValue(data)
      }catch(error: any){
          throw rejectWithValue(error.message)
      }
  }
);

export const addProducts = createAsyncThunk(
  'products/addProducts',
  async (url: string, thunkApi) => {
    const { rejectWithValue, fulfillWithValue } = thunkApi;
          try{
          const response = await fetch(url);
          if (!response.ok) {
              return rejectWithValue(response.status)
          }
          const data = await response.json();
          return fulfillWithValue(data)
      }catch(error: any){
          throw rejectWithValue(error.message)
      }
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    productList: [],
    curentCategory: 'Все',
    curentFetchProducts: [],
    statusProducts: 'idle',
    errorProducts: null,
  } as IProducts,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      if (action.payload !== state.curentCategory) {
        state.curentCategory = action.payload;
        state.productList = [];
      }
    },
    clearCatalog: (state) => {
      state.productList = [];
      state.curentFetchProducts = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        state.statusProducts = 'fulfilled';
        if (action.payload) {
            state.productList = action.payload;
          } else {
          state.errorProducts = 'Каталог не может быть загружен.'
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
          state.errorProducts = 'Ошибка при загрузке каталога.'
        };
      })

      .addCase(addProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        state.statusProducts = 'fulfilled';
        if (action.payload) {
            state.curentFetchProducts = action.payload;
            state.productList = [...state.productList, ...action.payload];
        } else {
          state.errorProducts = 'Каталог не может быть загружен.'
        }
      })
      .addCase(addProducts.pending, (state) => {
        state.statusProducts = 'pending';
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.statusProducts = 'rejected';
        if (action.payload) {
          state.errorProducts = action.payload;
        } else {
          state.errorProducts = 'Ошибка при загрузке каталога.'
        };
      })

  }
})

export const {setCategory, clearCatalog} = productsSlice.actions;
export default productsSlice.reducer;