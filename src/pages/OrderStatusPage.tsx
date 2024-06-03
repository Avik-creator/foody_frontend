import { OrderStatusSkeleton } from "@/Skeletons/OrderStatusPageSkeleton";
import { useGetMyOrders } from "@/api/OrderAPI";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useNavigate } from "react-router";

const OrderStatusPage = () => {
  const { orders, isLoading, error } = useGetMyOrders();
  const navigate = useNavigate();

  if (isLoading) {
    return <OrderStatusSkeleton />;
  }

  if (error) {
    navigate("/404");
  }

  if (orders?.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">No orders yet</h1>
        <p className="text-gray-500">You don't have any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {orders?.length !== 0 &&
        orders?.map((order) => (
          <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
            <OrderStatusHeader order={order} />
            <div className="grid gap-10 md:grid-cols-2">
              <OrderStatusDetail order={order} />
              <AspectRatio ratio={16 / 5}>
                <img
                  src={order.restaurant.imageUrl}
                  className="rounded-md object-cover h-full w-full"
                />
              </AspectRatio>
            </div>
          </div>
        ))}
    </div>
  );
};

export default OrderStatusPage;
