import { OrderStatusSkeleton } from "@/Skeletons/OrderStatusPageSkeleton";
import { useGetMyOrders } from "@/api/OrderAPI";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useNavigate } from "react-router";

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();
  const navigate = useNavigate();

  if (isLoading) {
    return <OrderStatusSkeleton />;
  }

  if (!orders || orders.length === 0) {
    navigate("/404");
  }

  console.log(orders);

  return (
    <div className="space-y-10">
      {orders?.map((order) => (
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
