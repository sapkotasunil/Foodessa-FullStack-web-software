import Image from "next/image";

function OrderAcceptedCard({ item }: any) {
  return (
    <>
      <div className="w-full bg-[#c8f2ef] shadow-md rounded-2xl border border-gray-200 p-5 hover:shadow-xl transition-all duration-300 max-h-fit">
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-5 items-center gap-6">
          {/* Left: Image + Name */}
          <div className="grid grid-cols-2   gap-1 items-start">
            <div>
              <Image
                src={
                  item?.item_image &&
                  item.item_image.replace("/media", "/api/v1/media")
                }
                alt={item?.item_name}
                width={80}
                height={80}
                className="rounded-xl object-cover shadow-sm border"
              />
              <p className="text-lg font-semibold  text-black mt-2">
                {item?.item_name}
              </p>
            </div>
            {/* Buyer Info */}
            <div className=" flex flex-col  h-full justify-center">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Buyer:</span> {item?.buyer_name}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Payment Method:</span>{" "}
                {item?.paymentStatus}
              </p>
            </div>
          </div>

          {/* Address & Phone */}
          <div className="space-y-1">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Address:</span>{" "}
              {item?.deliveryAddress}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Phone Number:</span>{" "}
              {item?.phone_number}
            </p>
          </div>
          <form
            action=""
            className=" grid grid-cols-2 min-w-fit space-x-4 col-span-2"
          >
            {/* Order Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order Status
              </label>
              <select
                //   value={orderStatus}
                //   onChange={(e) => setOrderStatus(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Delivery Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Status
              </label>
              <select
                //   value={deliveryStatus}
                //   onChange={(e) => setDeliveryStatus(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              >
                <option value="Pending">Pending</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </form>

          {/* Right: View Button */}
          <div className="flex justify-center sm:justify-end">
            <button
              // onClick={openModel}
              className="bg-[#217041] hover:bg-[#1a5c36] px-6 py-2 rounded-xl cursor-pointer text-white font-medium shadow-sm hover:shadow-md transition"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderAcceptedCard;
