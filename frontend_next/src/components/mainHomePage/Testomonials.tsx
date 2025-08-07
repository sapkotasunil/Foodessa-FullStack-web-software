export default function TestimonialsSection() {
  return (
    <section className=" text-center mb-5 mt-5">
      <hr className="py-10  px-4" />

      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-[#217041] mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <p className="text-[#404040] italic">
              “Foodessa has completely changed how I eat at home. The meals are
              delicious and feel like they’re made with love.”
            </p>
            <div className="mt-4 font-semibold text-[#217041]">Sita Sharma</div>
            <span className="text-sm text-gray-500">Kathmandu</span>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <p className="text-[#404040] italic">
              “I love supporting local cooks and getting fresh food delivered.
              The app is easy to use and reliable.”
            </p>
            <div className="mt-4 font-semibold text-[#217041]">
              Rajesh Thapa
            </div>
            <span className="text-sm text-gray-500">Pokhara</span>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <p className="text-[#404040] italic">
              “Great experience so far! On-time delivery and the chefs are super
              friendly through the chat.”
            </p>
            <div className="mt-4 font-semibold text-[#217041]">Anita K.C.</div>
            <span className="text-sm text-gray-500">Butwal</span>
          </div>
        </div>
      </div>
    </section>
  );
}
