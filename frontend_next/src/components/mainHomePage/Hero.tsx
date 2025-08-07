import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#f9f9f9] via-[#e3f7fa] to-[#fffdf4] flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#ebf9dc] rounded-full blur-3xl opacity-60 translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#e3f7fa] rounded-full blur-2xl opacity-70 -translate-x-1/2 translate-y-1/2 z-0" />

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <div>
          <h1 className=" text-4xl md:text-6xl font-bold text-[#217041] leading-tight">
            Welcome to{" "}
            <div>
              <Link href={"/"} className="font-bold  flex-1 flex">
                <span
                  className="inline-flex items-center justify-center p-2 md:h-18 h-10 w-10
          md:w-18 bg-[#217041] text-white -rotate-[31deg] rounded-full"
                >
                  F
                </span>
                oodessa
              </Link>
            </div>
          </h1>
          <p className="mt-6 text-lg text-[#404040] max-w-md">
            Experience the future of food delivery! Foodessa connects you with
            top home chefs and cloud kitchens nearby. Freshly prepared meals,
            fast delivery, and flavors that feel like home.
          </p>
          <ul className="mt-6 space-y-2 text-[#404040]">
            <li>🍽️ Order from verified local chefs</li>
            <li>🚀 Fast and reliable delivery</li>
            <li>💬 Live chat with kitchen owners</li>
            <li>📍 Discover kitchens near your location</li>
          </ul>
          <Link href="/auth/register">
            <button className="mt-8 bg-green-500  text-white px-6 py-3 rounded-xl text-lg shadow-lg hover:bg-green-600 transition-all">
              Let&apos;s Get Started
            </button>
          </Link>
        </div>

        {/* Image or Illustration */}
        <div className="w-full flex justify-center mt-8.5 pr-8 md:pr-24">
          <img
            src="/images/mainHomeBanner.png" // Place your hero image in /public/images
            alt="Delicious food"
            className="min-w-[52vw] h-fit rounded-2xl shadow-2xl  "
          />
        </div>
      </div>

      {/* Corner Register Button (for no-header layout) */}
      <Link href="/auth/register">
        <button className="absolute top-3 sm:top-6 right-20 sm:right-37 bg-[#fffdf4] text-[#217041] border border-[#217041] px-4 py-2 rounded-full text-sm hover:bg-[#ebf9dc] shadow-md transition-all">
          Register
        </button>
      </Link>
      <Link href="/auth/login">
        <button className="absolute top-3 sm:top-6 right-2 sm:right-16 bg-[#fffdf4] text-[#217041] border border-[#217041] px-4 py-2 rounded-full text-sm hover:bg-[#ebf9dc] shadow-md transition-all">
          Login
        </button>
      </Link>
    </section>
  );
}
