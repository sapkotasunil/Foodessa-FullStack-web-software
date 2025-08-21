const FoodCardSkeleton = () => {
  return (
    <div className="bg-[#ecf7df] rounded-2xl p-4 my-4 shadow animate-pulse">
      <div className="flex items-center">
        {/* Image placeholder */}
        <div className="bg-gray-300 rounded-full w-20 h-20"></div>
        <div className="ml-4 flex-1">
          <div className="bg-gray-300 h-5 w-1/2 mb-2 rounded"></div>
          <div className="bg-gray-300 h-3 w-1/3 mb-2 rounded"></div>
          <div className="bg-gray-300 h-3 w-2/3 rounded"></div>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div className="bg-gray-300 h-3 w-1/3 rounded"></div>
        <div className="bg-gray-300 h-3 w-1/4 rounded"></div>
      </div>
    </div>
  );
};

export default FoodCardSkeleton;
