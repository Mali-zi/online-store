import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISelectedProduct, IFullProduct } from '../../models/index';

export const fetchSelectedProduct = createAsyncThunk(
  'selectedProduct/fetchSelectedProduct',
  async (id: string, thunkApi) => {
    const { rejectWithValue, fulfillWithValue } = thunkApi;
          try{
          const response = await fetch(`http://localhost:7070/api/items/${id}`);
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
  price: '',
  sizes: [],
}

export const selectedProductSlice = createSlice({
  name: 'selectedProduct',
  initialState: {
    product: initialSelectedProduct,
    statusSelectedProduct: 'idle',
    errorSelectedProduct: null,
  } as ISelectedProduct,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSelectedProduct.fulfilled, (state, action: PayloadAction<IFullProduct>) => {
        state.statusSelectedProduct = 'fulfilled';
        if (action.payload) {
          state.product = action.payload;
        } else {
          state.errorSelectedProduct = 'Ошибка-2!'
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
          state.errorSelectedProduct = 'Oops! Something went wrong. Try again!';
        };
      })
  }
})

export default selectedProductSlice.reducer;