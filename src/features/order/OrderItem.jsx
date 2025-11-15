import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="space-y-1 px-4 py-1.5 sm:px-12 sm:py-3">
      <div className="flex justify-between gap-2 text-sm sm:items-center">
        <p>
          <span className="font-semibold">{quantity}&times;</span> {name}
        </p>
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm capitalize italic text-[#8c5a3c]">
        {isLoadingIngredients ? "loading..." : ingredients.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
