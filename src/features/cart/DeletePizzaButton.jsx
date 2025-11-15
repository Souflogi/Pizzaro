import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

function DeletePizzaButton({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button
      variant="outline"
      size="md"
      onClick={() => dispatch(deleteItem(pizzaId))}
    >
      {" "}
      Remove{" "}
    </Button>
  );
}

export default DeletePizzaButton;
