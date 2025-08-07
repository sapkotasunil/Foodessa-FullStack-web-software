function ItemCard({ data }: any) {
  console.log(data);
  return (
    <>
      <div className="bg-amber-50 px-3 py-1 rounded-xl grid grid-cols-1 space-y-6  w-full md:grid-cols-2 xl:grid-cols-4 my-4 mx-1 ">
        <div className="xl:flex   justify-center items-center gap-2 max-w-fit ">
          <img
            src={data.image && data.image.replace("/media/", "/api/v1/media/")}
            /*
            kitchenDetails.kitchen_profile_photo
                  ? typeof kitchenDetails.kitchen_profile_photo === "string"
                    ? kitchenDetails.kitchen_profile_photo
                    : URL.createObjectURL(kitchenDetails.kitchen_profile_photo)
                  : "/placeholder.png"
            */
            alt="food"
            height={98}
            width={98}
          />
          <div>
            <p className="font-semibold text-xl">{data?.item_name}</p>
            <p className="text-gray-600 text-sm">
              des:{data?.item_description}
            </p>
            <p className="text-gray-600 text-sm">price : {data?.price}</p>
          </div>
        </div>
        <div className="flex flex-col justify-center xl:mx-auto items-start">
          <h1>Category: {data?.category}</h1>
          <div className="flex justify-center items-center">
            Availabe Now :
            <div className="bg-green-400  rounded-xl py-0.5 px-3">
              <select name="" id="">
                <option
                  className="bg-green-400 rounded-xl py-0.5 px-5"
                  value={data?.is_available}
                >
                  Yes
                </option>
                <option
                  className="bg-red-400 rounded-xl py-0.5 px-3"
                  value="no"
                >
                  No
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="xl:mx-auto flex flex-col justify-center items-cener">
          <h1>Remaining Quantity : {data?.available_quantity}</h1>
          Add Quantity:
          <form action="">
            <input type="number" className="bg-green-200 rounded-2xl px-1" />
          </form>
        </div>
        <div className="xl:flex grid grid-cols-2  xl:mx-auto items-center gap-2 max-w-fit xl:w-full text-white">
          <button className="bg-green-500 max-h-fit  px-1 py-0.5 rounded-xl ">
            Update
          </button>
          <button className="bg-green-500  max-h-fit px-1 py-0.5 rounded-xl ">
            Edit Details
          </button>
        </div>
      </div>
    </>
  );
}
export default ItemCard;
