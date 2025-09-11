"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IUserLoginData } from "@/lib/store/auth/authSlice.types";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { loginUser, setStatus } from "@/lib/store/auth/authSlice";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/GlobalComponents/Loders";
import { Status } from "@/lib/types/types";

function Login() {
  const [data, setdata] = useState<IUserLoginData>({
    username: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const { errors, status } = useAppSelector((store) => store.auth);

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
  };

  const handleLoginSubmission = (e: FormEvent<HTMLFormElement>) => {
    setLoader(true);
    e.preventDefault();
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (status !== "loading") {
      setLoader(false);
    }
    if (status === "success") {
      toast.success("Login sucessfully");
      redirect("/buyer/home");
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Column - Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 bg-white">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-2xl font-bold text-gray-800"
            >
              <span className="inline-flex items-center justify-center p-2 h-10 w-10 bg-green-600 text-white -rotate-[31deg] rounded-full mr-3">
                <span className="rotate-[31deg] font-bold">F</span>
              </span>
              oodessa
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Welcome back
            </h1>
            <p className="text-gray-600">Sign in to your Foodessa account</p>
          </div>

          <form onSubmit={handleLoginSubmission} className="space-y-6">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                onChange={handleChange}
                name="username"
                value={data.username}
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
              />
              {errors?.username && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.username?.[0]}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95m3.249-2.383A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.973 9.973 0 01-4.21 5.442M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors?.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password?.[0]}
                </p>
              )}
            </div>

            {/* Error Message */}
            {errors?.detail && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">{errors.detail}</p>
              </div>
            )}

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2">Remember me</span>
              </label>
              <Link
                href="#"
                className="text-sm text-green-600 hover:text-green-700 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loader}
              className={`w-full bg-green-600 cursor-pointer hover:bg-green-700 disabled:bg-green-400 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center ${
                loader ? "cursor-not-allowed" : ""
              }`}
            >
              {loader ? (
                <Loader />
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                href="/buyer/auth/register"
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                Sign up now
              </Link>
            </p>
          </div>

          {/* Terms */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              By signing in, you agree to our{" "}
              <Link
                href="/terms"
                className="text-green-600 hover:text-green-700"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-green-600 hover:text-green-700"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>

        {/* Right Column - Banner */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-green-600 to-emerald-700 hidden lg:flex items-center justify-center p-12">
          <div className="text-center text-white">
            <div className="mb-8">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Secure Login</h2>
              <p className="text-green-100">
                Access your account securely with Foodessa's encrypted
                authentication system
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span>End-to-end encryption</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span>24/7 Customer support</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span>Instant access to your orders</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
