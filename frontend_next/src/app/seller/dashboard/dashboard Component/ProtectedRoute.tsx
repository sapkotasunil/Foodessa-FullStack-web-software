"use client";
import { useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAppSelector((store) => store.auth);

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // If user is still undefined/null (Redux not ready), don't do anything yet
    if (!user) return;

    if (user.role !== "seller") {
      router.replace("/buyer/home"); // replace prevents back button loop
    } else {
      setChecking(false);
    }
  }, [user, router]);

  // Loader until we know user's role
  if (checking) {
    return (
      <h1 className="text-2xl w-full mx-auto mt-20 h-screen text-black font-semibold flex items-center justify-center">
        Checking authorization...
      </h1>
    );
  }

  return <>{children}</>;
}

export default ProtectedRoute;
