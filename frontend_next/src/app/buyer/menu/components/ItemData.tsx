"use client";

import Title from "@/components/GlobalComponents/Title";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getAllItemsData } from "@/lib/store/seller/items/items";
import { useEffect, useState } from "react";
import { LuSettings2 } from "react-icons/lu";
import { RiSearch2Line } from "react-icons/ri";
import FoodItemCard from "../../home/components/FoodItemCard";

function ItemData() {
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((store) => store.item);
  useEffect(() => {
    data.length === 0 && dispatch(getAllItemsData());
  }, []);
  console.log(data);
  const [search, setSearch] = useState<string>("");
  let serchedItems = data.filter((item) =>
    item.item_name.toLowerCase().includes(search.toLowerCase())
  );
  console.log(serchedItems);

  return (
    <>
      <section className="mt-10 mx-auto max-w-full px-6 lg:px-12 min-h-screen">
        {/* Search Box */}
        <div className="w-full max-w-2xl lex items-center justify-center  mb-8">
          <div className="inline-flex  items-center justify-center bg-[#ebf9dc] overflow-hidden w-full p-4 px-5">
            <div className="text-lg cursor-pointer">
              <RiSearch2Line />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-none outline-none w-full text-sm pl-4 bg-deep"
              placeholder="search here.."
            />
            <div
              // onClick={toogleShowCategory}
              className="flexCenetr cursor-pointer text-lg border-1 pl-2"
            >
              <LuSettings2 />
            </div>
          </div>
        </div>

        <Title
          title1={"FOOD"}
          title2={"Selections"}
          titleStyles={"!pb-0 xl:text-start"}
          parsaStyles={""}
          title1Styles={""}
        />

        <div className="grid 2xl:grid-cols-3 space-x-12 space-y-4   xl:grid-cols-2 lg:grid-cols-2 ml-8  md:ml-11">
          {serchedItems.map((data) => (
            <FoodItemCard key={data.id} items={data} />
          ))}
        </div>
      </section>
    </>
  );
}

export default ItemData;
