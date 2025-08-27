import { TbTruckDelivery } from "react-icons/tb";
import { IoMdRestaurant } from "react-icons/io";
import { AiFillShop } from "react-icons/ai";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { PiChefHatFill } from "react-icons/pi";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section className=" mx-auto max-w-[1440px] px-6  lg:px-12 py-10 xl:py-18  ">
        <div className=" flex items-center justify-center gap-6 flex-col xl:flex-row">
          {/* left side */}
          <div className=" flex flex-1 flex-col pt-12 xl:pt-32">
            <h1 className=" text-[45px] leading-tight md:text-[55px] md:leading-[1.3] mb-4 font-bold max-w-[46rem]">
              Grab Exclusive
              <span className="inline-flex items-center justify-center ml-2 p-5 h-16 w-16 bg-[#217041] text-white -rotate-[31deg] rounded-full">
                F
              </span>
              ood Discount Now!
            </h1>
            <p className="text-gray-500">
              Foodessa a world of ﬂavors, freshness, and delight. Discovar
              dishes the satisfy your cravings, excite your taste buds, and
              bring people together. From classic favorites to modern delights,
              find the perfect meal for every moment.
            </p>
            <div className="mt-6">
              <Link
                href={"#"}
                className="medium-14 bg-[#217041] text-white px-7 py-3.5 rounded-full transition-all"
              >
                Explore Now
              </Link>
            </div>
          </div>
          {/* right side */}
          <div className=" flex flex-1 relative z-10 top-12">
            <div className="relative ">
              <img src="/images/bg.png" alt="error" height={666} width={666} />
              {/* Badge */}
              <div className="hidden sm:block absolute top-8 right-14 max-w-48 bg-green-500 shadow-sm pl-2 py-2 rounded-xl">
                <div className=" flex gap-2">
                  <TbTruckDelivery size={31} className=" text-secondary" />
                  <h5 className="relative text-[14px] md:text-[15px] mb-1 font-bold top-1">
                    Fast Delivery
                  </h5>
                </div>
                <p className="text-xs"> Fresh, hot Meals at your doorstep.</p>
              </div>
              {/* Badge 2 */}
              <div className="hidden sm:block absolute top-52 right-6 max-w-60 bg-green-500 shadow-sm p-2 rounded-xl">
                <div className=" flex gap-2">
                  <IoMdRestaurant size={26} className=" text-secondary" />
                  <h5 className=" text-[14px] md:text-[15px] mb-1 font-bold">
                    99+ Dishes
                  </h5>
                </div>
              </div>
              {/* Badge 3*/}
              <div className="hidden sm:block absolute top-3/4  right-12 max-w-48 bg-green-500 shadow-sm pl-2 py-2 rounded-xl">
                <div className=" flex gap-2">
                  <AiFillShop size={23} className=" text-[#217041]" />
                  <h5 className=" text-[14px] md:text-[15px] mb-1 font-bold  ">
                    200+ Branches
                  </h5>
                </div>

                <p className="text-xs  "> Bringing great food to you</p>
              </div>

              {/* Badge 4*/}
              <div className="hidden sm:block absolute top-28  left-3 max-w-48 bg-green-500 shadow-sm pl-2 py-2 rounded-xl">
                <div className=" flex gap-2">
                  <IoPeopleCircleOutline
                    size={31}
                    className=" text-secondary"
                  />
                  <h5 className=" text-[14px] md:text-[15px] mb-1 font-bold relative top-1 ">
                    Happy Customers
                  </h5>
                </div>
                <p className="text-xs">
                  {" "}
                  Serving smiles with every delicious bite.
                </p>
              </div>
              {/* Badge 5*/}
              <div className="hidden sm:block absolute bg-green-500 top-72  left-3 max-w-48 bg-light shadow-sm pl-2 py-2 rounded-xl">
                <div className=" flex gap-2">
                  <PiChefHatFill size={27} className=" text-secondary" />
                  <h5 className=" text-[14px] md:text-[15px] mb-1 font-bold relative top-1">
                    Exports coocks
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
