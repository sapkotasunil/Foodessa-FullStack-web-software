"use client";

import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/store/auth/authSlice";
import { Status } from "@/lib/types/types";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user, status, errors } = useAppSelector((store) => store.auth);
  const [loader, setloader] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloader(true);
    dispatch(loginUser(formData));
  };

  // 🔎 After login success, check role and redirect
  if (user?.role) {
    if (user.role === "manager") {
      router.push("/manager/dashboard");
    } else if (user.role === "seller") {
      router.push("/seller/dashboard");
    } else if (user.role === "buyer") {
      router.push("/buyer/home");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Manager Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Error */}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loader}
            className={`w-full py-2 rounded-lg text-white font-medium transition-colors ${
              loader
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loader ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
