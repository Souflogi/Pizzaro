import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../user/userSlice";
import { selectCart, selectTotalPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    customerlocation: JSON.parse(data?.customerlocation),
  };

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone = "Valid phone number is required for delivery purposes.";

  if (Object.keys(errors).length > 0) return errors;

  //if all okay procced

  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}?from=checkout`);
}

/*----------------------------------------------------------------------------------------*/

function CreateOrder() {
  const cart = useSelector(selectCart);

  const [withPriority, setWithPriority] = useState(false);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();

  const totalCartPrice = useSelector(selectTotalPrice);
  const totalToPay = totalCartPrice + (withPriority ? totalCartPrice * 0.2 : 0);

  const {
    status: addressStatus,
    error: addressError,
    userLocationInfos,
    username,
  } = useSelector((state) => state.user);

  const isAddressLoading = addressStatus === "loading";

  const dispatch = useDispatch();

  function addressLocationHandler(e) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="space-y-8 px-4 py-6">
      <h2 className="text-2xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST" className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              type="text"
              name="customer"
              required
              placeholder="Full name"
              className="input w-full"
              defaultValue={username}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              type="tel"
              name="phone"
              required
              placeholder="e.g., +212 6 1.."
              className="input w-full"
            />

            {formErrors?.phone && (
              <p className="mt-1 text-sm tracking-wide text-red-500">
                * {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              placeholder="123 Main St, Apar..."
              className="input w-full"
              defaultValue={userLocationInfos?.address ?? ""}
            />
            {!!addressError && (
              <p className="mt-1 text-sm tracking-wide text-red-500">
                *{" "}
                {"We couldn't get your address, make sure to fill this field."}
              </p>
            )}
          </div>
          {!userLocationInfos?.position && (
            <Button
              disabled={isSubmitting || isAddressLoading}
              type="button"
              onClick={addressLocationHandler}
              className="absolute right-1 z-10 md:top-px md:right-0"
            >
              {isAddressLoading ? "Locating..." : "Locate Me"}
            </Button>
          )}
        </div>

        <div className="flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 border-none accent-[#d24038] focus:ring focus:ring-[#f6c453] focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label
            className="text-sm font-medium sm:text-base"
            htmlFor="priority"
          >
            Want to yo give your order priority?
          </label>
        </div>

        <div className="mt-12">
          {/* passing Data from outside the form to be available for the redux action to use*/}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />

          <input
            type="hidden"
            name="customerlocation"
            value={JSON.stringify(userLocationInfos?.position ?? "")}
          />

          <Button
            size="md"
            type="submit"
            disabled={isSubmitting || isAddressLoading}
          >
            {isSubmitting
              ? "placing order..."
              : `Order now for ${formatCurrency(totalToPay)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
