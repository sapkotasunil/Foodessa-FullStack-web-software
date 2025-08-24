import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getAllOrdersDataBySeller } from "@/lib/store/orders/orders.slice";
import { useEffect } from "react";
import HistoryItemCard from "./HistoryItemCard";

function HistoryData() {
  const dispatch = useAppDispatch();

  const { ordered_data } = useAppSelector((store) => store.orders);
  useEffect(() => {
    ordered_data.length === 0 && dispatch(getAllOrdersDataBySeller());
  }, []);

  console.log(ordered_data);
  const successfulOrder = ordered_data.filter(
    (item) => item.orderStatus === "SUCESS"
  );
  const unsucessOrder = ordered_data.filter(
    (item) => item.orderStatus === "UNSUCESS"
  );
  const canceledOrder = ordered_data.filter(
    (item) => item.orderStatus === "CANCEL"
  );
  return (
    <>
      <div className=" text-xl font-bold text-black my-2 w-full h-fit rounded-md px-1 py-1 bg-green-200 border-green-500 border-l-6">
        Sucessfull Orders
      </div>
      <div className="grid lg:grid-cols-2">
        {successfulOrder.length !== 0 ? (
          successfulOrder.map((item) => <HistoryItemCard item={item} />)
        ) : (
          <h1 className="text-gray-500 text-2xl font-semibold">
            No Sucessfull Orders Available
          </h1>
        )}
      </div>
      <div className=" mt-6 text-xl font-bold text-black my-2 w-full h-fit rounded-md px-1 py-1 bg-red-200 border-red-500 border-l-6">
        Failed Orders
      </div>
      <div className="grid lg:grid-cols-2">
        {unsucessOrder.length !== 0 ? (
          unsucessOrder.map((item) => <HistoryItemCard item={item} />)
        ) : (
          <h1 className="text-gray-500 text-2xl font-semibold">
            No Failed Orders Available
          </h1>
        )}
      </div>
      <div className=" mt-6 text-xl font-bold text-black my-2 w-full h-fit rounded-md px-1 py-1 bg-amber-200 border-amber-500 border-l-6">
        Declined Orders
      </div>
      <div className="grid lg:grid-cols-2">
        {canceledOrder.length !== 0 ? (
          canceledOrder.map((item) => <HistoryItemCard item={item} />)
        ) : (
          <h1 className="text-gray-500 text-2xl font-semibold">
            No Declined Orders Available
          </h1>
        )}
      </div>
    </>
  );
}

export default HistoryData;
