"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IUserLoginData } from "@/lib/store/auth/authSlice.types";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { loginUser } from "@/lib/store/auth/authSlice";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/GlobalComponents/Loders";
import SucessFullMessage from "@/components/GlobalComponents/SucessFullMessage";

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
      redirect("/home");
    }
  }, [status]);

  return (
    <div className="min-h-screen  bg-[#f5fbf7] text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:my-10 bg-[#f5fbf7] shadow sm:rounded-lg flex justify-start flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6  sm:p-12  bg-[#f5fbf7]">
          <div className="text-2xl md:text-4xl font-bold text-[#217041] leading-tight">
            <Link href={"/"} className="font-bold  flex-1 flex">
              <span
                className="inline-flex items-center justify-center p-2 md:h-12 h-7 w-7
          md:w-12 bg-[#217041] text-white -rotate-[31deg] rounded-full"
              >
                F
              </span>
              oodessa
            </Link>
          </div>
          <div className="mt-12 flex flex-col items-start">
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-start">
                <h1 className="text-green-500 text-2xl md:text-4xl font-bold mb-4">
                  Sign in to your account
                </h1>
                <p className="text-gray-400 mb-8">
                  No account yet?{" "}
                  <Link
                    href="/auth/register"
                    className="text-purple-400 hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>

              <form onSubmit={handleLoginSubmission} className=" max-w-xs">
                <input
                  onChange={handleChange}
                  name="username"
                  className="input-field !py-4"
                  type="text"
                  value={data.username}
                  placeholder="username"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.username?.[0]}
                  </p>
                )}
                {/* Password field with eye icon */}
                <div className="relative w-full">
                  <input
                    className="input-field !py-4 !mt-5 pr-12"
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={data.password}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none"
                  >
                    {!showPassword ? (
                      // Eye open SVG
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
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
                    ) : (
                      // Eye closed SVG
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
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
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.password?.[0]}
                  </p>
                )}
                {errors.detail && (
                  <p className="text-red-500 text-sm mt-2">{errors.detail}</p>
                )}
                <button
                  className={` ${
                    loader && "cursor-not-allowed"
                  }  mt-5 text-white tracking-wide font-semibold bg-green-500 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
                >
                  {loader ? (
                    <Loader />
                  ) : (
                    <>
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy={7} r={4} />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="">Sign In</span>
                    </>
                  )}
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by Cartesian Kinetics
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted p-1"
                  >
                    Terms of Service
                  </a>
                  and its
                  <a
                    href="#"
                    className="border-b p-1 border-gray-500 border-dotted"
                  >
                    Privacy Policy
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-[#f5fbf7]    hidden lg:flex ">
          <div
            className=" w-full bg-contain bg-center lg:ml-24 rounded-sm bg-no-repeat"
            style={{
              backgroundImage: "url(/images/loginBanner.png)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default Login;
