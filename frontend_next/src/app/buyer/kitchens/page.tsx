"use client";
import Title from "@/components/GlobalComponents/Title";
import KitchenDetailsCards from "./components/KitchenDetailsCards";
import API from "@/lib/http/API";
import { useEffect, useState } from "react";

function kitchen() {
  const [KitchensData, setKitchensData] = useState([]);
  const FetchKitchen = async () => {
    try {
      const response = await API.get("/kitchens/");
      if (response.status === 200) {
        setKitchensData(response.data);
      }
    } catch (error) {
      alert("SomeThing Went Wrong !! Please try later");
    }
  };

  useEffect(() => {
    FetchKitchen();
  }, []);

  const sellerKitchens = KitchensData.filter(
    (kitchen: any) => kitchen.user_role === "seller"
  );

  return (
    <div>
      <div className="max-w-[1340px] mx-auto mt-5">
        <Title
          title1={"Kitchen"}
          title2={"Details"}
          titleStyles={"!pb-0 xl:text-start"}
          parsaStyles={""}
          title1Styles={""}
        />

        <div className=" grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:grid-cols-4 space-x-3 space-y-3">
          {sellerKitchens.map((kitchen) => (
            <KitchenDetailsCards kitchen={kitchen} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default kitchen;
