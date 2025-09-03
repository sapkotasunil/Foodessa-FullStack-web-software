import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IkitchenDetails, IkitchenDetailsinitial } from "./kitchenDetails.type";
import { Status } from "@/lib/types/types";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";

const kitchenDetailsInitial: IkitchenDetailsinitial = {
  kitchenDetails: {
    created_at: "",
    id: 0,
    kitchen_address: "",
    kitchen_description: "",
    kitchen_name: "",
    kitchen_profile_photo: null,
    kitchen_type: "",
    phone_number: "",
    user: "",
    kitchen_qr_photo: null,
  },
  status: Status.LOADING,
};

export const kitchenDetails = createSlice({
  name: "kitchen",
  initialState: kitchenDetailsInitial,
  reducers: {
    setKitchenDetails(
      state: IkitchenDetailsinitial,
      action: PayloadAction<IkitchenDetails>
    ) {
      state.kitchenDetails = action.payload;
    },
    setStatus(state: IkitchenDetailsinitial, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});
export const { setKitchenDetails, setStatus } = kitchenDetails.actions;
export default kitchenDetails.reducer;

export function getKitchenDetails() {
  return async function getKitchenDetailsThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.get("/seller/details/");

      if (response.status === 200) {
        dispatch(setKitchenDetails(response.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
