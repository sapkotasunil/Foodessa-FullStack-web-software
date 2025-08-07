"use client";

import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";
import { useEffect } from "react";

function HistoryData() {
  useEffect(() => {
    async function getKitchenDetails() {
      try {
        const response = await APIWITHTOKEN.get("/seller/items/");

        if (response.status === 200) {
          console.log(response.data);
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    }
    getKitchenDetails();
  }, []);

  return <></>;
}

export default HistoryData;
