import { Status } from "@/lib/types/types";

export interface IOrderStatusData {
  deleveryStatus: string;
  orderStatus: string;
}

export interface IOrderStatusInitialData {
  orderStatusData: string;
  status: Status;
}
