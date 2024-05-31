import UserProfileFormSkeleton from "@/Skeletons/UserProfileFormSkeleton";
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

const DetailPage = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const { error, restaurant, isLoading } = useGetRestaurant(restaurantId);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const cartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return cartItems ? JSON.parse(cartItems) : [];
  });

  const onCheckOut = (userFormData: UserFormData) => {
    console.log("User Data", userFormData);
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
    return <UserProfileFormSkeleton />;
  }

  if (error) {
    navigate("/404");
  }

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
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckOut}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
