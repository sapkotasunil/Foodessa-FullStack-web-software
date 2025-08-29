import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import itemsSlice from "./seller/items/items";
import kitchen from "./seller/kitchenDetails/kitchenDetailsSlice";
import seller from "./seller/sellerRegisterSlice";
import cart from "./cart/cart.slice";
import orders from "./orders/orders.slice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import orderStatus from "@/lib/store/seller/OrderStatus/orderStatusSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth", "kitchen", "cart"],
};

const reducer = combineReducers({
  auth: authSlice,
  item: itemsSlice,
  kitchen: kitchen,
  cart: cart,
  orders: orders,
  seller: seller,
  OrderStatus: orderStatus,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredActionPaths: ["meta.arg", "payload", "error", "err"], // 👈 ignore error objects
        ignoredPaths: ["items.dates"], // if any state slice stores Date objects etc.
      },
    }),
});

export default store;
export type AppDispatch = typeof store.dispatch; // useDispatch lai type dina chayenxa
export type RootState = ReturnType<typeof store.getState>; // useSelector lai type dina chayenxa
