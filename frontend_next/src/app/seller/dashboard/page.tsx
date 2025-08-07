"use client";
import { useAppDispatch } from "@/lib/store/hooks";
import { getKitchenDetails } from "@/lib/store/seller/kitchenDetails/kitchenDetailsSlice";
import { useEffect } from "react";

function dashboard() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getKitchenDetails());
  }, []);

  return <h1>i am a dashboard</h1>;
}

export default dashboard;
