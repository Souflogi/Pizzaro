import { formatCurrency } from "../../utils/helpers";
import DeletePizzaButton from "./DeletePizzaButton";
import UpdateItemQuantity from "./UpdateItemQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 pl-4 sm:flex sm:items-center sm:justify-between">
      <p className="font-semibold">
        {quantity}&times; {name}
      </p>

      <div className="flex items-center sm:gap-4">
        <p className="text-sm font-semibold text-[#d24038]">
          {formatCurrency(totalPrice)}
        </p>
        <UpdateItemQuantity pizzaId={pizzaId} quantity={quantity} />
        <DeletePizzaButton pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
