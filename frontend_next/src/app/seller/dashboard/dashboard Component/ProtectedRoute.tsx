"use client";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function ProtectedManager({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // new loading state

  useEffect(() => {
    const checkRole = async () => {
      try {
        const response = await APIWITHTOKEN.get("/userrole/");
        const userRole = response.data.role;

        if (userRole !== "seller") {
          router.replace("/buyer/home"); // redirect immediately
        } else {
          setRole(userRole); // only set role if manager
        }
      } catch (error) {
        console.error(error);
        router.replace("/login");
      } finally {
        setLoading(false); // stop loader once check is done
      }
    };

    checkRole();
  }, [router]);

  // Show loader while checking
  if (loading || role === null) {
    return (
      <>
        <h1 className="text-2xl absolute w-full mx-auto bg-white mt-20 h-screen text-black font-semibold flex items-center justify-center">
          Checking authorization...
        </h1>
      </>
    );
  }

  // Render children only if role verified as manager
  return <>{children}</>;
}

export default ProtectedManager;
