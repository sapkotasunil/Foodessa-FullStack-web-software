"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IUserRegisterData } from "@/lib/store/auth/authSlice.types";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { registerUser, setStatus } from "@/lib/store/auth/authSlice";
import Loader from "@/components/GlobalComponents/Loders";
import { redirect } from "next/navigation";
import { SucessfulModel } from "@/components/GlobalComponents/SucessfullModel";
import { Status } from "@/lib/types/types";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState<IUserRegisterData>({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    profile_picture: null,
    address: "",
    phone_number: "",
    first_name: "",
    last_name: "",
    gender: "",
  });
  const { errors, status } = useAppSelector((store) => store.auth);

  const dispatch = useAppDispatch();
  const [passWordMatch, setPassWordMatch] = useState(true);
  const [loader, setLoader] = useState(false);

  const handleChange = (e: ChangeEvent<any>) => {
    const { name, value, files } = e.target;

    setData({
      ...data,
      [name]: name === "profile_picture" ? files?.[0] ?? null : value,
    });
  };

  const handleRegisterSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      setLoader(true);
      setPassWordMatch(true);
      dispatch(registerUser(data));
      console.log("submmited", data);
    } else setPassWordMatch(false);
  };

  useEffect(() => {
    if (status !== "loading") {
      setLoader(false);
    }
    if (status === "success") {
      SucessfulModel("Registered successfully", "Welcome to the foodessa");
      dispatch(setStatus(Status.LOADING));
      redirect("/buyer/auth/login/");
    }
  }, [status]);
  return (
    <div className=" min-h-fit flex items-center justify-center p-4">
      <div className="w-full max-w-[1200px] bg-[#4d5448] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="w-full md:w-1/2 relative">
          <div className="absolute top-6 left-6 text-white text-3xl font-bold z-10">
            <a href="/" className="bold-24 flex-1 flex">
              <span
                className="inline-flex items-center justify-center p-2 h-8
                    w-8 bg-[#217041] text-white -rotate-[31deg] rounded-full"
              >
                F
              </span>
              oodessa
            </a>
          </div>

          {/* Show success modal when registration is successful */}

          <a
            href="/"
            className="absolute top-6 right-6 bg-green-600 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm hover:bg-green-500 transition-colors z-10"
          >
            Back to website →
          </a>
          <div className="relative h-full">
            <img
              src="/images/authBanner.png"
              alt="Food Image"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-yellow-700/20" />
            <div className="absolute bottom-5 left-12 text-white">
              <h2 className="text-3xl text-[#ffffff] md:text-4xl font-bold mb-2">
                Bringing Kitchens Online
              </h2>
              <p className="text-sm md:text-base font-semibold text-white/80">
                Order. Eat. Enjoy.
              </p>
              <div className="flex gap-2 mt-6">
                <div className="w-4 h-1 bg-white/30 rounded" />
                <div className="w-4 h-1 bg-white/30 rounded" />
                <div className="w-4 h-1 bg-white rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-6 md:p-12 bg-[#f5fbf7]">
          <div className="max-w-md mx-auto">
            <h1 className="text-green-500 text-2xl md:text-4xl font-bold mb-4">
              Create an Account
            </h1>
            <p className="text-gray-400 mb-8">
              Already have an account?{" "}
              <Link
                href="/buyer/auth/login"
                className="text-purple-400 hover:underline"
              >
                Log in
              </Link>
            </p>

            <form onSubmit={handleRegisterSubmission} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={data.first_name}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={data.last_name}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username <span className="text-red-500 text-xl ">*</span>
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={data.username}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.username[0]}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email<span className="text-red-500 text-xl ">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label
                  htmlFor="phone_number"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                  <span className="text-red-500 text-xl ">*</span>
                </label>
                <input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  value={data.phone_number}
                  onChange={handleChange}
                  pattern="\d{10}"
                  title="Phone number must be exactly 10 digits (e.g. 9801234567)"
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address<span className="text-red-500 text-xl ">*</span>
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={data.address}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  value={data.gender}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="profile_picture"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Profile Picture
                </label>
                <input
                  id="profile_picture"
                  name="profile_picture"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password<span className="text-red-500 text-xl ">*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.password[0]}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                  <span className="text-red-500 text-xl ">*</span>
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={data.confirmPassword}
                  onChange={handleChange}
                  required
                  className="input-field !mb-0"
                />

                {!passWordMatch && (
                  <p className="text-red-500 text-sm mt-2">
                    Passwords do not match
                  </p>
                )}
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="form-checkbox"
                  />
                  <span className="ml-2 text-[14px] text-gray-500">
                    Show Password
                  </span>
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  required
                  className="rounded text-green-600  focus:ring-green-600"
                />
                <span className="text-gray-600 text-sm">
                  I agree to the{" "}
                  <a href="#" className="hover:underline">
                    Terms & Conditions
                  </a>
                </span>
              </div>

              <button
                type="submit"
                className={`w-full ${
                  loader && "cursor-not-allowed"
                } bg-green-600 hover:bg-green-700 py-3 text-white   rounded-lg font-medium`}
              >
                {loader ? <Loader /> : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
