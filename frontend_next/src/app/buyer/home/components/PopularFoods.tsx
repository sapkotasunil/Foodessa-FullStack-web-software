"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Title from "@/components/GlobalComponents/Title";
import Item from "./FoodItemCard";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect } from "react";
import { getAllItemsData } from "@/lib/store/seller/items/items";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

// ...existing code...

function PopularFoods() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    data.length === 0 && dispatch(getAllItemsData());
  }, []);

  const { data } = useAppSelector((store) => store.item);
  const PopularFoods = data.slice(-6, -1);

  return (
    <section className=" mx-auto max-w-[1440px] px-6 lg:px-12 pt-16">
      <Title
        title1={"POPULAR"}
        title2={"FOODS"}
        titleStyles={"text-center !pb-16"}
        parsaStyles={"!block"}
        title1Styles={""}
      />
      <Swiper
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          700: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          1050: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          1400: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        modules={[Autoplay, Pagination]}
        className="h-[255px] "
      >
        {PopularFoods.map((food) => (
          <SwiperSlide key={food.id} className="pl-8 ">
            <Item items={food} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default PopularFoods;
