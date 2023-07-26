import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {IProduct, ICategory, ICategories} from '../../models/index';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
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

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categoriesList: [],
    selectedCategory: initialSelectedCategory,
    statusCategories: 'idle',
    errorCategories: null,
  } as ICategories,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        state.statusCategories = 'fulfilled';
        if (action.payload) {
          state.categoriesList = action.payload;
        } else {
          state.errorCategories.message = 'Ошибка-3!'
        }
      })
      .addCase(fetchCategories.pending, (state) => {
        state.statusCategories = 'pending';
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.statusCategories = 'rejected';
        if (action.payload) {
          state.errorCategories = action.payload;
        } else {
          state.errorCategories = 'Oops! Something went wrong. Try again!';
        };
      })

  }
})

export default categoriesSlice.reducer;