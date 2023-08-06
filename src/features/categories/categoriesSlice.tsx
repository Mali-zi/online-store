import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICategory, ICategories } from '../../models/index';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (url: string, thunkApi) => {
  const { rejectWithValue, fulfillWithValue } = thunkApi;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return rejectWithValue(response.status);
    }
    const data = await response.json();
    return fulfillWithValue(data);
  } catch (error: any) {
    throw rejectWithValue(error.message);
  }
});

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categoriesList: [],
    statusCategories: 'idle',
    errorCategories: null,
  } as ICategories,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<ICategory[]>) => {
        state.statusCategories = 'fulfilled';
        if (action.payload) {
          state.categoriesList = action.payload;
        } else {
          state.errorCategories = 'Категории не могут быть загружены.';
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
          state.errorCategories = 'Ошибка при загрузке категорий.';
        }
      });
  },
});

export default categoriesSlice.reducer;
