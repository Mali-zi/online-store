import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {ICartProducts, ICartProduct, IOrder, IPlaceOrderProps} from '../../models/index';



const initialOrder: IOrder = {
  owner: {
    phone: '',
    address: '',
  },
  items: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartProducts: [],
    statusCart: 'idle',
    errorCart: null,
    order: initialOrder,
  } as ICartProducts,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartProduct>) => {
      if (action.payload) {
        const findIndex = state.cartProducts.findIndex(cartProduct => 
          cartProduct.product.id === action.payload.product.id && cartProduct.pickedSize === action.payload.pickedSize);
        if (findIndex > -1) {
          const newCount = state.cartProducts[findIndex].count + action.payload.count;
          if (newCount < 11) {
            state.cartProducts[findIndex].count = newCount;
          } else {
            state.errorCart = 'Ошибка: общее количество не должно быть больше 10.';
          };
        } else {
          state.cartProducts = [...state.cartProducts, action.payload];
        }
      };
    },
    clearError: (state) => {
      state.errorCart = null;
    },
    placeOrder: (state, action: PayloadAction<IPlaceOrderProps>) => {
      const itemsList = state.cartProducts.map((cartProduct) => { 
        return (
          {
            id: cartProduct.product.id,
            price: cartProduct.product.price,
            size: cartProduct.pickedSize,
            count: cartProduct.count,
          }
        )
      }
    );
    state.order = {
      owner: {
        phone: action.payload.phone,
        address: action.payload.address,
      },
      items: itemsList
    };
    }
  },
})

export const {addToCart, clearError, placeOrder} = cartSlice.actions;
export default cartSlice.reducer;