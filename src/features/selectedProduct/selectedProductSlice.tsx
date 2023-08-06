import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ISelectedProduct, IFullProduct } from '../../models/index';

export const fetchSelectedProduct = createAsyncThunk(
  'selectedProduct/fetchSelectedProduct',
  async (id: string, thunkApi) => {
    const { rejectWithValue, fulfillWithValue } = thunkApi;
    try {
      const response = await fetch(`http://localhost:7070/api/items/${id}`);
      if (!response.ok) {
        return rejectWithValue(response.status);
      }
      const data = await response.json();
      return fulfillWithValue(data);
    } catch (error: any) {
      throw rejectWithValue(error.message);
    }
  }
);

const initialSelectedProduct: IFullProduct = {
  id: '',
  category: '',
  title: '',
  images: [],
  sku: '',
  manufacturer: '',
  color: '',
  material: '',
  reason: '',
  season: '',
  heelSize: '',
  price: 0,
  sizes: [],
};

export const selectedProductSlice = createSlice({
  name: 'selectedProduct',
  initialState: {
    product: initialSelectedProduct,
    statusSelectedProduct: 'idle',
    errorSelectedProduct: null,
    selectedSize: '',
    selectedAmount: 0,
  } as ISelectedProduct,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchSelectedProduct.fulfilled, (state, action: PayloadAction<IFullProduct>) => {
        state.statusSelectedProduct = 'fulfilled';
        if (action.payload) {
          state.product = action.payload;
        } else {
          state.errorSelectedProduct = 'Карточка товара не может быть загружена.';
        }
      })
      .addCase(fetchSelectedProduct.pending, (state) => {
        state.statusSelectedProduct = 'pending';
      })
      .addCase(fetchSelectedProduct.rejected, (state, action) => {
        state.statusSelectedProduct = 'rejected';
        if (action.payload) {
          state.errorSelectedProduct = action.payload;
        } else {
          state.errorSelectedProduct = 'Ошибка при загрузке карточки товара.';
        }
      });
  },
});

export default selectedProductSlice.reducer;
