"use client";
import Navbar from "@/components/GlobalComponents/Navbar";
import Title from "@/components/GlobalComponents/Title";
import { useState } from "react";
import { LuSettings2 } from "react-icons/lu";
import { RiSearch2Line } from "react-icons/ri";
import ItemData from "./components/ItemData";

function menuPage() {
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <Navbar />
      <ItemData />
    </>
  );
}

export default menuPage;
