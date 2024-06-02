import DetailPageSkeleton from "@/Skeletons/DetailPageSkeleton";
import UserProfileFormSkeleton from "@/Skeletons/UserProfileFormSkeleton";
import {
  CreateRazorPayCheckoutSession,
  CreateStripeCheckoutSession,
} from "@/api/OrderAPI";
import { useGetRestaurant } from "@/api/RestaurantAPI";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { CartItem, MenuItem as MenuItemType } from "@/utils/Types";
import { UserFormData } from "@/utils/ZodSchemas";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const key = import.meta.env.VITE_RAZORPAY_KEY_ID!;

const DetailPage = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const { error, restaurant, isLoading } = useGetRestaurant(restaurantId);
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    CreateStripeCheckoutSession();
  const {
    createCheckoutSession: createRazorPaySession,
    isLoading: isRazorpayLoading,
  } = CreateRazorPayCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const cartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return cartItems ? JSON.parse(cartItems) : [];
  });

  const onCheckOut = async (userFormData: UserFormData) => {
    if (!restaurant) return;
    const checkoutData = {
      cartItems: cartItems.map((item) => ({
        menuItemId: item._id,
        name: item.name,
        quantity: item.quantity.toString(),
      })),
      deliveryDetails: {
        email: userFormData.email!,
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
      },
      restaurantId: restaurant._id,
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;

      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  if (isLoading) {
    return <DetailPageSkeleton />;
  }

  if (error) {
    navigate("/404");
  }

  const createRazorPayCheckout = async (userFormData: UserFormData) => {
    if (!restaurant) return;
    const checkoutData = {
      cartItems: cartItems.map((item) => ({
        menuItemId: item._id,
        name: item.name,
        quantity: item.quantity.toString(),
      })),
      deliveryDetails: {
        email: userFormData.email!,
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
      },
      restaurantId: restaurant._id,
    };

    const order = await createRazorPaySession(checkoutData);

    const options = {
      key,
      amount: Number(order.order.amount),
      currency: order.order.currency,
      name: "Foody",
      description: "Payment for food items",
      order_id: order.order.id,
      callback_url:
        "http://localhost:3000/api/order/checkout/razorpay/verfiy-signature",
      redirect: true,
      prefill: {
        name: userFormData.name,
        email: userFormData.email,
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant?.imageUrl}
          alt={restaurant?.restaurantName}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant!} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant?.menuItems.map((item) => (
            <MenuItem menuItem={item} addToCart={() => addToCart(item)} />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant!}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <div className="flex flex-1 flex-col gap-5">
                <CheckoutButton
                  disabled={cartItems.length === 0}
                  onCheckout={onCheckOut}
                  title="Pay Using Stripe"
                  isLoading={isCheckoutLoading}
                />

                <CheckoutButton
                  disabled={cartItems.length === 0}
                  onCheckout={createRazorPayCheckout /* Implement this */}
                  title="Pay Using RazorPay"
                  isLoading={isRazorpayLoading}
                />
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
