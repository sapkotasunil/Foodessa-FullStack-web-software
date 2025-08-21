import FoodCardSkeleton from "./FoodCardSkeleton";

const FoodSkeletonGrid = () => {
  return (
    <>
      <div className="grid xl:grid-cols-2 2xl:grid-cols-3 gap-6 mt-12 mx-3 md:mx-16">
        {Array.from({ length: 12 }).map((_, i) => (
          <FoodCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
};

export default FoodSkeletonGrid;
