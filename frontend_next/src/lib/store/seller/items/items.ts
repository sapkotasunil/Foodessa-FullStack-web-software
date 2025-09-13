import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IAdditemData,
  IitemInitialData,
  IItemQuantity,
  IresposeItemData,
} from "./items.slice";
import { Status } from "@/lib/types/types";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";
import API from "@/lib/http/API";

const itemsIntitialState: IitemInitialData = {
  data: [],
  status: Status.IDLE,
  error: {},
  saveStatus: Status.IDLE,
};

const itemsSlice = createSlice({
  name: "items",
  initialState: itemsIntitialState,
  reducers: {
    setAddItem(
      state: IitemInitialData,
      action: PayloadAction<IresposeItemData>
    ) {
      state.data.push(action.payload);
    },
    setUpdateItem(
      state: IitemInitialData,
      action: PayloadAction<IresposeItemData>
    ) {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index != -1) {
        state.data[index] = action.payload;
      } else {
        alert("error");
      }
    },

    setStatus(state: IitemInitialData, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setError(state: IitemInitialData, action: PayloadAction<{}>) {
      state.error = action.payload;
    },

    setFetchItemData(
      state: IitemInitialData,
      action: PayloadAction<IresposeItemData[]>
    ) {
      state.data = action.payload;
    },

    setSaveStatus(state: IitemInitialData, action: PayloadAction<Status>) {
      state.saveStatus = action.payload;
    },
  },
});

export const {
  setAddItem,
  setFetchItemData,
  setStatus,
  setUpdateItem,
  setError,
  setSaveStatus,
} = itemsSlice.actions;
export default itemsSlice.reducer;

export function addItemData(data: IAdditemData) {
  return async function addItemDataThunk(dispatch: AppDispatch) {
    dispatch(setSaveStatus(Status.IDLE));

    try {
      const response = await APIWITHTOKEN.post("/seller/items/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        dispatch(setAddItem(response.data));
        dispatch(setSaveStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
export function getSellerItemsData() {
  return async function getSellerItemsDataThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.get("/seller/items/");
      if (response.status === 200) {
        dispatch(setFetchItemData(response.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
export function getAllItemsData() {
  return async function getAllItemsDataThunk(dispatch: AppDispatch) {
    try {
      const response = await API.get("/buyer/items/");
      if (response.status === 200) {
        dispatch(setFetchItemData(response.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function UpdateItemsQuantity(
  id: number,
  errorId: number | null,
  data: any
) {
  return async function UpdateItemsQuantityThunk(dispatch: AppDispatch) {
    dispatch(setSaveStatus(Status.IDLE));
    dispatch(setError(""));

    try {
      const response = await APIWITHTOKEN.patch(
        "seller/item/" + id + "/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        dispatch(setUpdateItem(response.data));
        dispatch(setSaveStatus(Status.SUCCESS));
      } else {
        dispatch(setSaveStatus(Status.ERROR));
      }
    } catch (error: any) {
      dispatch(
        setError({ errors: error?.response?.data?.detail, id: errorId })
      );
    }
  };
}
