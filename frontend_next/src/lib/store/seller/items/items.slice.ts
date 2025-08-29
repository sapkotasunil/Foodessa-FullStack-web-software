import { Status } from "@/lib/types/types";

export interface IAdditemData {
  item_name: string;
  item_description: string;
  image: File | null;
  category: string;
  price: number;
  preperiation_time: string;
}

export interface IresposeItemData extends IAdditemData {
  id: number;
  sold_quantity: number;
  available_quantity: number;
  created_at: string;
  is_available: string;
  kitchen_name: string;
  kitchen_photo: File | null;
}

export interface IitemInitialData {
  data: IresposeItemData[];
  status: Status;
}

export interface IItemQuantity {
  newQuantity: number | string;
  is_available: string;
}
