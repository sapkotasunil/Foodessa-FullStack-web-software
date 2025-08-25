import { Status } from "@/lib/types/types";
import { ISellerRegisterFormData } from "../sellerRegister.types";

export interface IkitchenDetails extends ISellerRegisterFormData {
  id: number;
  user: string;
  created_at: string;
}

export interface IkitchenDetailsinitial {
  kitchenDetails: IkitchenDetails;
  status: Status;
}
