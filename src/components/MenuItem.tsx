import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MenuItem as menuItem } from "@/utils/Types";
type Props = {
  menuItem: menuItem;
  addToCart: () => void;
};

const MenuItem = ({ menuItem, addToCart }: Props) => {
  return (
    <Card className="cursor-pointer" onClick={addToCart}>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        Rs{menuItem.price.toFixed(2)}
      </CardContent>
    </Card>
  );
};

export default MenuItem;
