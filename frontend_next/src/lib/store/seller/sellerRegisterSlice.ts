import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ISellerRegisterFormData,
  IsellerRegisterInitialState,
} from "./sellerRegister.types";
import { Status } from "@/lib/types/types";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";
import { AppDispatch } from "@/lib/store/store";

const initialState: IsellerRegisterInitialState = {
  SellerFormData: {
    kitchen_name: "",
    kitchen_description: "",
    kitchen_address: "",
    phone_number: "",
    kitchen_type: "",
    kitchen_profile_photo: null,
    kitchen_qr_photo: null,
  },
  status: Status.LOADING,
};

const sellerRegister = createSlice({
  name: "sellerRegister",
  initialState: initialState,
  reducers: {
    setSellerRegisterFormData(
      state: IsellerRegisterInitialState,
      action: PayloadAction<ISellerRegisterFormData>
    ) {
      state.SellerFormData = action.payload;
    },

    setStatus(
      state: IsellerRegisterInitialState,
      action: PayloadAction<Status>
    ) {
      state.status = action.payload;
    },
  },
});

export const { setSellerRegisterFormData, setStatus } = sellerRegister.actions;
export default sellerRegister.reducer;

export function sellerRegisterForm(data: ISellerRegisterFormData) {
  return async function sellerRegisterFormThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.post("/seller/register/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setSellerRegisterFormData(data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      console.log(error);
    }
  };
}

export function editedSellerData(id: number, data: any) {
  return async function editedSellerDataThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.patch(
        `/update_kitchen/${id}/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setSellerRegisterFormData(response.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      console.log(error);
    }
  };
}
