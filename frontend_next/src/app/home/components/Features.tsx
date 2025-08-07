import Title from "@/components/GlobalComponents/Title";
const Features = () => {
  const services = [
    {
      title: "Fast delivery",
      subtitle:
        " Get your order quickly with our reliable and efficient service",
      Image: "/assets/shipping-fast.svg",
    },
    {
      title: "Hot foods",
      subtitle:
        "Savor freshly prepared, steaming hot meals delivered straight to you",
      Image: "/assets/hot-food.svg",
    },
    {
      title: "Fresh food",
      subtitle:
        " we serve meals made from the freshest and finest ingradients daily",
      Image: "/assets/fresh-food.svg",
    },
    {
      title: "Expert chefs",
      subtitle: "our skilled chefs craft every dish with passion and precision",
      Image: "/assets/hat-chef.svg",
    },
  ];
  return (
    <section className=" mx-auto max-w-[1440px] px-6 py-16  !pb-12">
      <Title
        title1={"WHY CHOOSE"}
        title1Styles={""}
        title2={"US"}
        titleStyles={"text-center !pb-16"}
        parsaStyles={"!block"}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-12 ">
        {services.map(({ title, subtitle, Image }) => (
          <div
            key={title}
            className=" flex items-center justify-center flex-col gap-3 bg-[#e0fbc2] p-4 py-8 rounded-xl "
          >
            <img src={Image} alt="" height={44} width={44} />
            <div className="flex items-center justify-center flex-col">
              <h5 className="h5 ">{title}</h5>
              <hr className=" w-8 bg-[#217041] h-1 rounded-full border-none" />
            </div>
            <p className="text-center ">{subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
