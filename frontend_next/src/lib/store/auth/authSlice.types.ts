import { Status } from "@/lib/types/types";

export interface IUserLoginData {
  username: string;
  password: string;
}

export interface IUserRegisterData extends IUserLoginData {
  email: string;
  profile_picture: File | null;
  address: string;
  phone_number: string;
  confirmPassword: string;
  first_name: string;
  last_name: string;
  gender: string;
}
export interface IUserProfileData {
  id: number;
  email: string;
  profile_picture: File | null;
  address: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  gender: string;
  role?: string;
}

export interface IAuthInitialState {
  user: IUserProfileData;
  status: Status;
  token: string;
  errors: any;
}
