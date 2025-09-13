"use client";
import { useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function ProtectedManager({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAppSelector((store) => store.auth);

  useEffect(() => {
    if (user && user.role !== "manager") {
      router.push("/buyer/home");
    }
  }, [user.role]);

  if (!user.role) {
    return (
      <h1 className="text-2xl w-full mx-auto mt-20 h-screen  text-black font-semibold flex items-center justify-center">
        Checking authorization...
      </h1>
    );
  }

  if (user.role === "manager") {
    return <>{children}</>;
  }
  return null;
}

export default ProtectedManager;
