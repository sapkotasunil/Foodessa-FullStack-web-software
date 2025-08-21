function ItemCard({ data }: any) {
  // List of categories from Django TextChoices

  return (
    <div className="bg-amber-50 px-3 py-1 rounded-xl grid grid-cols-1 space-y-6 w-full md:grid-cols-2 xl:grid-cols-4 my-4 mx-1">
      {/* Image and details */}
      <div className="xl:flex justify-center items-center gap-2 max-w-fit">
        <img
          src={data.image && data.image.replace("/media/", "/api/v1/media/")}
          alt="food"
          height={98}
          width={98}
          className="rounded-md object-cover"
        />
        <div>
          <p className="font-semibold text-xl">{data?.item_name}</p>
          <p className="text-gray-900 text-sm line-clamp-2">
            Description:{" "}
            <span className="text-gray-500 ">{data?.item_description}</span>
          </p>
          <p className="text-black text-sm mt-1">Price: {data?.price}</p>
        </div>
      </div>

      {/* Category and availability */}
      <div className="flex flex-col justify-center xl:mx-auto items-start">
        <div className="flex justify-center items-center mt-3">
          Available Now:
          <div className="ml-2">
            <select
              className={`rounded-xl py-0.5 px-3 ${
                data?.is_available ? "bg-green-400" : "bg-red-400"
              }`}
              value={data?.is_available ? "yes" : "no"}
              onChange={(e) => console.log("Availability:", e.target.value)}
            >
              <option value="yes" className="bg-green-400">
                Yes
              </option>
              <option value="no" className="bg-red-400">
                No
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Quantity */}
      <div className="xl:mx-auto flex flex-col justify-center">
        <h1>Remaining Quantity: {data?.available_quantity}</h1>
        <label className="mt-2">Add Quantity:</label>
        <input
          type="number"
          className="bg-green-200 rounded-2xl px-2 py-1 mt-1"
          onChange={(e) => console.log("Add quantity:", e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="xl:flex grid grid-cols-2 xl:mx-auto items-center gap-2 max-w-fit xl:w-full text-white">
        <button className="bg-green-500 px-2 py-1 rounded-xl">Update</button>
        <button className="bg-green-500 px-2 py-1 rounded-xl">
          Edit Details
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
