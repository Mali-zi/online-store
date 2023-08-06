import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICartProducts, ICartProduct, IOrder, IPlaceOrderProps } from '../../models/index';

const localStorageItems = localStorage.getItem('cartProducts');
let initialCartProducts: ICartProduct[] = [];
if (localStorageItems) {
  initialCartProducts = JSON.parse(localStorageItems);
}

export const sendOrder = createAsyncThunk('cart/sendOrder', async (order: IOrder, thunkApi) => {
  const { rejectWithValue, fulfillWithValue } = thunkApi;
  try {
    const response = await fetch('http://localhost:7070/api/order', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      return rejectWithValue(response.status);
    }
    const data = await response.text();
    return fulfillWithValue(data);
  } catch (error: any) {
    throw rejectWithValue(`Ошибка при отправке заказа: ${error.message}`);
  }
});

const initialOrder: IOrder = {
  owner: {
    phone: '',
    address: '',
  },
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartProducts: initialCartProducts,
    statusCart: 'idle',
    errorCart: null,
    order: initialOrder,
  } as ICartProducts,

  reducers: {
    addToCart: (state, action: PayloadAction<ICartProduct>) => {
      if (action.payload) {
        const findIndex = state.cartProducts.findIndex(
          (cartProduct) =>
            cartProduct.product.id === action.payload.product.id && cartProduct.pickedSize === action.payload.pickedSize
        );
        if (findIndex > -1) {
          const newCount = state.cartProducts[findIndex].count + action.payload.count;
          if (newCount < 11) {
            state.cartProducts[findIndex].count = newCount;
          } else {
            state.errorCart = 'Ошибка: общее количество не должно быть больше 10.';
          }
        } else {
          state.cartProducts = [...state.cartProducts, action.payload];
        }
      }
    },

    deleteProduct: (state, action: PayloadAction<string>) => {
      state.cartProducts = state.cartProducts.filter((cartProduct) => cartProduct.product.id !== action.payload);
    },

    clearError: (state) => {
      state.errorCart = null;
    },

    clearStatus: (state) => {
      state.statusCart = 'idle';
    },

    placeOrder: (state, action: PayloadAction<IPlaceOrderProps>) => {
      const itemsList = state.cartProducts.map((cartProduct) => {
        return {
          id: Number(cartProduct.product.id),
          price: cartProduct.product.price,
          count: cartProduct.count,
        };
      });
      console.log(itemsList);
      state.order = {
        owner: {
          phone: action.payload.userPhone,
          address: action.payload.userAddress,
        },
        items: itemsList,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.fulfilled, (state) => {
        state.statusCart = 'fulfilled';
        state.cartProducts = [];
        state.errorCart = null;
        state.order = initialOrder;
        localStorage.clear();
      })
      .addCase(sendOrder.pending, (state) => {
        state.statusCart = 'pending';
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.statusCart = 'rejected';
        if (action.payload) {
          state.errorCart = action.payload;
        } else {
          state.errorCart = 'Ошибка при отправке заказа.';
        }
      });
  },
});

export const { addToCart, clearError, placeOrder, clearStatus, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
