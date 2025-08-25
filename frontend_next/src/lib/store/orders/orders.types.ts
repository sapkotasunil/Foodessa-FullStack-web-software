import { Status } from "@/lib/types/types";

export interface IUserDataForOrders {
  item_name: number;
  kitchen_name: string;
  phone_number: string;
  deliveryAddress: string;
  totalPrice: number;
  quantity: number;
  paymentStatus: string;
  payment: File | null;
}

export interface IuserResponseDataForOrders extends IUserDataForOrders {
  id: number;
  buyer_name: string;
  orderStatus: string;
  deleveryStatus: string;
  created_at: string;
  Status_updated_at: string;
  item_image: string;
}

export interface IOrderSliceInitial {
  ordered_data: IuserResponseDataForOrders[];
  status: Status;
}
