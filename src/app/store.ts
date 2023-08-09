import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import topSalesReducer from '../features/topSales/topSalesSlice';
import selectedProductReducer from '../features/selectedProduct/selectedProductSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import cartReducer from '../features/cart/cartSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist';

const persistconfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['cart']
};

const rootReducer = combineReducers({ 
  products: productsReducer,
  categories: categoriesReducer,
  topSales: topSalesReducer,
  selectedProduct: selectedProductReducer,
  cart: cartReducer,
})

const persistedreducer = persistReducer(persistconfig, rootReducer);

// export const store = configureStore({
//   reducer: {
//     products: productsReducer,
//     categories: categoriesReducer,
//     topSales: topSalesReducer,
//     selectedProduct: selectedProductReducer,
//     cart: cartReducer,
//   },
// });

export const store = configureStore({
  reducer: persistedreducer,
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
