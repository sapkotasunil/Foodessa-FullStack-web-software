import { useEffect } from "react";
import ItemCard from "./ItemCard";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getSellerItemsData } from "@/lib/store/seller/items/items";

function ItemsData({ searched, data }: any) {
  const SearchedItem = data.filter((item: any) =>
    item.item_name.toLowerCase().includes(searched.toLowerCase())
  );

  return (
    <>
      <div className="">
        <div className="">
          {SearchedItem.map((data: any) => (
            <ItemCard key={data.id} data={data} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ItemsData;
