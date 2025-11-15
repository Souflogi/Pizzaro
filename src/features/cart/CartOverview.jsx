import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectTotalPrice, selectTotalQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);

  if (totalQuantity === 0) return null;
  return (
    <div className="cart-preview flex items-center justify-around px-4 py-4 text-sm uppercase sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-[#fffdf4]">
        <span>{totalQuantity} pizza(s)</span>
        <span> {formatCurrency(totalPrice)}</span>
      </p>
      <Link
        to="/cart"
        className="font-semibold tracking-wide text-[#fffdf4] underline-offset-4 hover:underline"
      >
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
