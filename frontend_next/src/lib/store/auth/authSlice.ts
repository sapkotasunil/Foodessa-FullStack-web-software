import { Status } from "@/lib/types/types";
import {
  IAuthInitialState,
  IUserLoginData,
  IUserProfileData,
  IUserRegisterData,
} from "./authSlice.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import API from "@/lib/http/API";
import { AppDispatch } from "../store";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";

const authInitialState: IAuthInitialState = {
  token: "",
  status: Status.LOADING,
  errors: {},
  user: {
    address: "",
    email: "",
    first_name: "",
    gender: "",
    id: 0,
    last_name: "",
    phone_number: "",
    role: "",
    profile_picture: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setToken(state: IAuthInitialState, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setStatus(state: IAuthInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setUser(state: IAuthInitialState, action: PayloadAction<IUserProfileData>) {
      state.user = action.payload;
    },
    setErrors(state: IAuthInitialState, action: PayloadAction<any>) {
      state.errors = action.payload;
    },
    setUpdatedUserData(state: IAuthInitialState, action: PayloadAction<any>) {
      state.user.role = action.payload.role;
    },
  },
});

export const { setStatus, setToken, setUser, setErrors, setUpdatedUserData } =
  authSlice.actions;
export default authSlice.reducer;

export function registerUser(data: IUserRegisterData) {
  return async function registerUserThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/register/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setErrors({}));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      dispatch(setErrors(error.response.data));
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function loginUser(data: IUserLoginData) {
  return async function loginUserThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    dispatch(setErrors({}));

    try {
      const response = await API.post("/token/", data);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setToken(response.data.access));
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        dispatch(setUser(response.data.user));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      dispatch(setErrors(error?.response?.data));
    }
  };
}

export function updateUser(id: number, data: {}) {
  return async function updateUserThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    dispatch(setErrors({}));

    try {
      const response = await APIWITHTOKEN.patch(`/user/${id}/`, data);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setUpdatedUserData(response.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      dispatch(setErrors(error?.response?.data));
    }
  };
}
