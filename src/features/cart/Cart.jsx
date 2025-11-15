import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import { selectUsername } from "../user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const username = useSelector(selectUsername);

  if (!cart.length) {
    return <EmptyCart />;
  }

  return (
    <div className="px-4 py-5">
      <LinkButton as={Link} to="/menu">
        &larr; Back to menu
      </LinkButton>

      <h2 className="mt-7 text-2xl font-semibold">
        {!cart.length ? "Your Cart is Empty" : `Your cart, ${username}`}
      </h2>
      <ul className="mt-4 divide-y divide-[#f1c27d]/70 border-b border-[#f1c27d]/70 pb-8">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>

      <div className="mt-8 space-x-4.5">
        {!!cart.length && (
          <Button size="md" as={Link} to="/order/new">
            Order pizzas
          </Button>
        )}
        <Button
          size="md"
          variant={"outline"}
          disabled={!cart.length}
          onClick={() => {
            dispatch(clearCart());
          }}
        >
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
