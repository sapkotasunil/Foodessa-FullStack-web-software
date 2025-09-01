import SellerOrdersData from "./components/SellerOrdersData";

function Orders() {
  return (
    <>
      <main className="flex-1 p-6 bg-gray-100 overflow-y-scroll h-screen">
        <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
        <SellerOrdersData />
      </main>
    </>
  );
}
export default Orders;
