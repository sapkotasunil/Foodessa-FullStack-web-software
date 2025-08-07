"use client";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { IUserLoginData } from "@/lib/store/auth/authSlice.types";
import { useAppDispatch } from "@/lib/store/hooks";
import { loginUser } from "@/lib/store/auth/authSlice";

function Login() {
  const [data, setdata] = useState<IUserLoginData>({
    username: "",
    password: "",
  });
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
  };

  const handleLoginSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(data));
    console.log(data, "submitted datas");
  };

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
                <input
                  className="input-field !py-4 !mt-5"
                  onChange={handleChange}
                  type="password"
                  name="password"
                  value={data.password}
                  placeholder="Password"
                />
                <button className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
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
                  <span className="ml-">Sign In</span>
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
