import { useEffect } from "react";
import ItemCard from "./ItemCard";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getSellerItemsData } from "@/lib/store/seller/items/items";

function ItemsData({ searched }: any) {
  const { data } = useAppSelector((store) => store.item);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSellerItemsData());
  }, []);
  console.log(data);

  const SearchedItem = data.filter((item) =>
    item.item_name.toLowerCase().includes(searched.toLowerCase())
  );

  return (
    <>
      <div className="overflow-y-scroll max-h-screen ">
        <div className="pr-3">
          {SearchedItem.map((data) => (
            <ItemCard key={data.id} data={data} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ItemsData;
