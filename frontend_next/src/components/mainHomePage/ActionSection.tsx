import Link from "next/link";
function ActionSection() {
  return (
    <section className=" bg-[#e3f7fa] text-center">
      <hr className="py-5" />
      <h2 className="text-3xl md:text-4xl font-bold text-[#217041]">
        Ready to taste something amazing?
      </h2>
      <p className="text-[#404040] mt-4 mb-8">
        Join our community of food lovers and discover unique flavors near you.
      </p>
      <Link href="/register">
        <button className="bg-[#217041] text-white px-8 py-3 rounded-lg text-lg shadow-lg hover:bg-[#195f36] transition-all">
          Sign Up Now
        </button>
      </Link>
    </section>
  );
}

export default ActionSection;
