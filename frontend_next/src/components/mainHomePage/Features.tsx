export default function Features() {
  return (
    <section className="py-20  text-center">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-[#217041] mb-4">
          Why Choose Foodessa?
        </h2>
        <p className="text-[#404040] mb-10">
          We bring convenience, freshness, and reliability straight to your
          doorstep.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-[#217041] mb-2">
              Home-Cooked Quality
            </h3>
            <p className="text-[#404040]">
              Meals prepared with love by local chefs using fresh ingredients.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-[#217041] mb-2">
              Affordable Pricing
            </h3>
            <p className="text-[#404040]">
              Great meals at better prices — no hidden costs.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-[#217041] mb-2">
              Real-Time Tracking
            </h3>
            <p className="text-[#404040]">
              Track your order from kitchen to your doorstep in real-time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
