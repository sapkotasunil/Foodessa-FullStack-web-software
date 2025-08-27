"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import MenuAnalyticsDashboard from "./components/MenuAnalyticsDashboard";
import { getSellerItemsData } from "@/lib/store/seller/items/items";
import { useEffect } from "react";

function reports() {
  const { data } = useAppSelector((store) => store.item);
  const dispatch = useAppDispatch();

  useEffect(() => {
    !data && dispatch(getSellerItemsData());
  }, []);
  console.log(data);
  return (
    <>
      <div className=" overflow-y-scroll h-screen">
        <MenuAnalyticsDashboard items={data} />
      </div>
    </>
  );
}

export default reports;
