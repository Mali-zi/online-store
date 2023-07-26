import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import topSalesReducer from '../features/topSales/topSalesSlice';
import selectedProductReducer from '../features/selectedProduct/selectedProductSlice';


export const store = configureStore({
  reducer: {
    products: productsReducer,
    topSales: topSalesReducer,
    selectedProduct: selectedProductReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
