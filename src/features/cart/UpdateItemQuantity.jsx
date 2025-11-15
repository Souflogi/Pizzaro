import { useDispatch } from "react-redux";
import { adjustQuantity } from "./cartSlice";
import Button from "../../ui/Button";

function UpdateItemQuantity({ pizzaId, quantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-0.5 md:gap-2">
      <Button
        size="sm"
        shape="round"
        onClick={() => {
          dispatch(adjustQuantity({ pizzaId, change: -1 }));
        }}
      >
        -
      </Button>

      <p className="text-sm font-medium">{quantity}</p>
      <Button
        size="sm"
        shape="round"
        onClick={() => {
          dispatch(adjustQuantity({ pizzaId, change: 1 }));
        }}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
