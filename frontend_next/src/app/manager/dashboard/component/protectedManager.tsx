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
  }, []);

  if (!user) {
    return <p className="text-center mt-10">Checking permissions...</p>;
  }

  if (user.role === "manager") {
    return <>{children}</>;
  }
  return null;
}

export default ProtectedManager;
