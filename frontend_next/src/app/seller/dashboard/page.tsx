"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getKitchenDetails } from "@/lib/store/seller/kitchenDetails/kitchenDetailsSlice";
import { useEffect } from "react";
import KitchenDetailsBanner from "./dashboard Component/KitchenDetailsBanner";

function dashboard() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getKitchenDetails());
  }, []);

  const { kitchenDetails } = useAppSelector((store) => store.kitchen);

  return (
    <>
      <div className=" overflow-y-scroll h-screen ">
        <KitchenDetailsBanner kitchen={kitchenDetails} />
      </div>
    </>
  );
}

export default dashboard;
