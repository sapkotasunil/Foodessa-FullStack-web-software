import { FaCheck, FaStar } from "react-icons/fa6";
import Title from "@/components/GlobalComponents/Title";

function Testomonials() {
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      image: "/images/user1.png",
      verified: true,
      rating: 5,
      title: "High quality",
      review:
        "The food was absolutely delicious! Every bite was bursting with flavor, and the quality was top-notch. Highly recommend trying it out!",
      foodImages: ["/images/food_1.png", "/images/food_2.png"],
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "/images/user2.png",
      verified: true,
      rating: 5,
      title: "Outstanding services",

      review:
        "Absolutely amazing experience! The food quality was excellent, and the service was prompt. Will definitely order again!",
      foodImages: ["/images/food_3.png", "/images/food_4.png"],
    },
  ];

  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-16">
      <Title
        title1={"DELICIOUS"}
        title2={"REVIEWS"}
        titleStyles="text-center !pb-16"
        parsaStyles={"!block"}
        title1Styles={""}
      />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-10 mb-16 rounded-3xl">
        {/* Left Side */}
        <div className="hidden sm:flex flex-col items-start justify-between gap-4">
          <Title
            title1={"What People"}
            title2={"Say"}
            titleStyles="pb-6"
            parsaStyles={"!block"}
            title1Styles={""}
          />
          <div className="flex flex-col gap-2 bg-[#e0fbc2] p-4 rounded-lg">
            <div className="flex text-[#217041] gap-1">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} />
              ))}
            </div>
            <div className="medium-14">
              More than <b>+25,000 reviews</b>
            </div>
          </div>
        </div>

        {/* Right Side - Reviews */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-4 bg-[#e0fbc2] rounded-xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <h5 className="font-semibold">{review.name}</h5>
                </div>
                {review.verified && (
                  <div className="flex items-center gap-1 px-3 py-1 text-white bg-green-600 rounded-xl">
                    <FaCheck /> Verified
                  </div>
                )}
              </div>
              <hr className="my-2" />
              <div className="flex text-yellow-500 gap-1">
                {[...Array(review.rating)].map((_, index) => (
                  <FaStar key={index} />
                ))}
              </div>
              <h4 className="font-semibold mt-2">{review.title}</h4>
              <p className="text-sm text-gray-600">{review.review}</p>
              <div className="flex gap-2 mt-3">
                {review.foodImages.map((food, index) => (
                  <img
                    key={index}
                    src={food}
                    alt="food"
                    className="w-12 h-12 rounded-md object-cover"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testomonials;
