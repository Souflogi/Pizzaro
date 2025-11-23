// Test ID: IIDSAT CQE92U C3MRAT

import { useFetcher, useLoaderData, useSearchParams } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../cart/cartSlice";
import UpdateOrderPriority from "./UpdateOrderPriority";

export async function loader({ params, request }) {
  const order = await getOrder(params.orderId);
  return order;
}

// ------------------------------------------------------
function Order() {
  const fetcher = useFetcher();
  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
  }, [fetcher]);

  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  //Cleaning the Cart when coming FROM checkout   <====
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const fromCheckout = searchParams.get("from") === "checkout";

  useEffect(() => {
    if (fromCheckout) dispatch(clearCart());
  }, [fromCheckout, dispatch]);
  //-----
  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-medium">
          Order #<span className="text-[#d24038]">{id}</span> status
        </h2>
        <div className="space-x-3">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-red-50 uppercase">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-green-100 uppercase">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-xl border border-[#f1c27d] bg-[#fff7ea] px-3 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="space-y-1 divide-y divide-[#f1c27d]/50">
        {cart.map((pizza) => (
          <OrderItem
            item={pizza}
            key={pizza.pizzaId}
            ingredients={
              fetcher.data?.find((item) => item.id === pizza.pizzaId)
                ?.ingredients ?? []
            }
            isLoadingIngredients={fetcher.state === "loading"}
          />
        ))}
      </ul>

      <div className="divide-y divide-[#f1c27d]/70 bg-[#fff4d4]">
        <p className="p-2 text-sm">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && (
          <p className="p-2 text-xs">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="p-2 font-semibold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrderPriority />}
    </div>
  );
}

export default Order;
