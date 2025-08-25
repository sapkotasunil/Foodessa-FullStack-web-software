import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IOrderSliceInitial,
  IUserDataForOrders,
  IuserResponseDataForOrders,
} from "./orders.types";
import { Status } from "@/lib/types/types";
import { AppDispatch } from "../store";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";

const ordersInitialData: IOrderSliceInitial = {
  ordered_data: [],
  status: Status.LOADING,
};

const OrderSlice = createSlice({
  name: "orders",
  initialState: ordersInitialData,
  reducers: {
    setOrderData(
      state: IOrderSliceInitial,
      action: PayloadAction<IuserResponseDataForOrders>
    ) {
      state.ordered_data.push(action.payload);
    },
    setFetchOrderdData(
      state: IOrderSliceInitial,
      action: PayloadAction<IuserResponseDataForOrders[]>
    ) {
      state.ordered_data = action.payload;
    },
    setStatus(state: IOrderSliceInitial, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setUpdateStatus(state: IOrderSliceInitial, action: PayloadAction<any>) {
      const index = state.ordered_data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index != -1) {
        state.ordered_data[index] = action.payload;
      } else {
        console.log("cannot find order");
      }
    },
  },
});

export const { setFetchOrderdData, setOrderData, setStatus, setUpdateStatus } =
  OrderSlice.actions;
export default OrderSlice.reducer;

export function addOrders(data: IUserDataForOrders) {
  return async function addOrdersThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.post("/buyer/order/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("item added sucessfully", response.data);
      if (response.status === 201) {
        dispatch(setOrderData(response.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      console.log(error);
    }
  };
}
export function getAllOrdersData() {
  return async function getAllOrdersDataThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get("/buyer/orders/");
      if (response.status === 200) {
        dispatch(setFetchOrderdData(response.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      console.log(error);
    }
  };
}
export function getAllOrdersDataBySeller() {
  return async function getAllOrdersDataBySellerThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get("/seller/orders/");
      if (response.status === 200) {
        dispatch(setFetchOrderdData(response.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      console.log(error);
    }
  };
}
