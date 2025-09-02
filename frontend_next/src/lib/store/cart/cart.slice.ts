import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IitemInitialData as cartdatasInitial,
  IresposeItemData as cartDatas,
} from "../seller/items/items.slice";
import { Status } from "@/lib/types/types";
import { AppDispatch } from "../store";
//@ts-ignore
const cartSliceinitialData: cartdatasInitial = {
  data: [],
  status: Status.LOADING,
};

const cartData = createSlice({
  name: "cart",
  initialState: cartSliceinitialData,
  reducers: {
    setAddItem(state: cartdatasInitial, action: PayloadAction<cartDatas>) {
      state.data.push(action.payload);
    },

    setRemoveItem(state: cartdatasInitial, action: PayloadAction<number>) {
      const index = state.data.findIndex(
        (items) => items.id === action.payload
      );
      if (index === -1) {
        console.log("canot find items");
      }
      state.data.splice(index, 1);
    },
  },
});

export const { setAddItem, setRemoveItem } = cartData.actions;
export default cartData.reducer;

export function addToCart(data: cartDatas) {
  return async function addToCartThunk(dispatch: AppDispatch) {
    dispatch(setAddItem(data));
  };
}
export function removecartData(id: number) {
  return async function removecartDataThunk(dispatch: AppDispatch) {
    dispatch(setRemoveItem(id));
  };
}
