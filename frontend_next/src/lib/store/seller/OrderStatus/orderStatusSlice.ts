import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IOrderStatusData,
  IOrderStatusInitialData,
} from "./OrderStatusSlice.Type";
import { Status } from "@/lib/types/types";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";
import { setUpdateStatus } from "../../orders/orders.slice";

const OrderStatusInitial: IOrderStatusInitialData = {
  orderStatusData: "",

  status: Status.LOADING,
};
const OrderStatusSlice = createSlice({
  name: "OrderStatus",
  initialState: OrderStatusInitial,
  reducers: {
    setOrderStatus(
      state: IOrderStatusInitialData,
      action: PayloadAction<Status>
    ) {
      state.status = action.payload;
    },

    setorderStatusData(
      state: IOrderStatusInitialData,
      action: PayloadAction<string>
    ) {
      state.orderStatusData = action.payload;
    },
  },
});

export default OrderStatusSlice.reducer;
export const { setOrderStatus, setorderStatusData } = OrderStatusSlice.actions;

export function UpdateOrderStatus(id: number, data: IOrderStatusData) {
  return async function UpdateOrderStatusThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.patch(
        "seller/order/" + id + "/",
        data
      );
      if (response.status === 200) {
        dispatch(setOrderStatus(Status.SUCCESS));

        dispatch(setorderStatusData(response.data.orderStatus));
        dispatch(setUpdateStatus(response.data));
      } else {
        dispatch(setOrderStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setOrderStatus(Status.ERROR));
    }
  };
}
