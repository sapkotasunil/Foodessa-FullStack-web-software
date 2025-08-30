import { Status } from "@/lib/types/types";

export interface ISellerRegisterFormData {
  kitchen_name: string; // Name of the kitchen
  kitchen_description: string; // Description of the kitchen
  kitchen_address: string; // Address of the kitchen
  phone_number: string; // Phone number of the kitchen
  kitchen_type: string; // Type of the kitchen
  kitchen_profile_photo: File | null; // Profile photo of the kitchen
  kitchen_qr_photo: File | null; // Profile photo of the kitchen
}

export interface IsellerRegisterInitialState {
  SellerFormData: ISellerRegisterFormData; // Form data for seller registration
  status: Status;
}
