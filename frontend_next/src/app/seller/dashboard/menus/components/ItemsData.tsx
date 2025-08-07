import { useEffect } from "react";
import ItemCard from "./ItemCard";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getSellerItemsData } from "@/lib/store/seller/items/items";

function ItemsData() {
  const { data } = useAppSelector((store) => store.item);
  const dispatch = useAppDispatch();

  useEffect(() => {
    data.length === 0 && dispatch(getSellerItemsData());
  }, []);

  return (
    <>
      {data.map((data) => (
        <ItemCard key={data.id} data={data} />
      ))}
    </>
  );
}

export default ItemsData;
