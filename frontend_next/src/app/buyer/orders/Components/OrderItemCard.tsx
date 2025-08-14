function OrderItemCard({ order }: any) {
  return (
    <div
      key={order.id}
      className="bg-[#f4fbf2] border-t-2 border-gray-400 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 p-1"
    >
      <img
        src={
          order.item_image &&
          order.item_image.replace("/media/", "/api/v1/media/")
        }
        alt="waiting"
        className="w-full h-60 rounded-2xl bg-[#ecf7e8] border-b-2 hover:border-2 hover:border-green-600 transition duration-300  border-gray-400 object-fill"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{order.item_name}</h3>
        <p className="text-gray-500">{order.kitchen_name}</p>

        <p className="text-sm">Qty: {order.quantity}</p>
        <p className="text-sm font-bold text-green-600">
          Rs. {order.totalPrice}
        </p>

        <p className="text-sm">
          Payment:{" "}
          <span
            className={`px-2 py-1 rounded ${
              order.paymentStatus === "ONLINE"
                ? "bg-blue-200 text-blue-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {order.paymentStatus}
          </span>
        </p>
        {order.orderStatus === "ACCEPT" && (
          <p className="text-sm">
            Status:{" "}
            <span
              className={`px-2 py-1 rounded ${
                order.deleveryStatus === "DELIVERED"
                  ? "bg-green-100 text-green-700"
                  : order.deleveryStatus === "PREPARING"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {order.deleveryStatus}
            </span>
            <p className="text-xs text-blue-600 mt-1">
              Last Update: {new Date(order.Status_updated_at).toLocaleString()}
            </p>
          </p>
        )}
        <div className=" grid space-y-2">
          <p className="text-xs text-gray-600">
            Ordered on:{" "}
            <span className="text-gray-500">
              {" "}
              {new Date(order.created_at).toLocaleString()}
            </span>
          </p>
          {order.orderStatus === "PENDING" && (
            <button className="bg-red-500 rounded-md text-md hover:bg-red-600 hover:cursor-pointer py-0.5 text-white px-2">
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderItemCard;
