import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, selectItemQuantityById } from "../cart/cartSlice";
import DeletePizzaButton from "../cart/DeletePizzaButton";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import pizzaNotFound from "../../assets/pizza-not-found.png";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const soldOutImg = soldOut ? "saturate-0 opacity-50" : "";
  const quantity = useSelector(selectItemQuantityById(id));
  const inCart = quantity > 0;
  // Simple fallback: always fall back to the bundled pizza-not-found asset.
  const safeImageUrl = imageUrl || pizzaNotFound;

  const onClickHandler = () => {
    const pizza = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1, //initial calc
    };
    dispatch(addItem(pizza));
  };

  return (
    <li className="flex gap-5 rounded-2xl border border-[#f7c994]/70 bg-[#fff8ec] p-3 shadow-sm">
      <img
        src={safeImageUrl}
        alt={name}
        className={`h-24 rounded-xl ${soldOutImg}`}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = pizzaNotFound;
        }}
      />
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-sm capitalize italic text-[#8c5a3c]">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between text-sm uppercase">
          {!soldOut ? (
            <p className="font-semibold text-[#d24038]">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="text-[#c9986c]">Sold out</p>
          )}
          {inCart && (
            <>
              <UpdateItemQuantity pizzaId={id} quantity={quantity} />
              <DeletePizzaButton pizzaId={id} />
            </>
          )}
          {!soldOut && !inCart && (
            <Button
              size="md"
              disabled={soldOut}
              onClick={() => onClickHandler()}
            >
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
