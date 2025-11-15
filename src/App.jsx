import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import AppLayout from "./ui/AppLayout";

import CreateOrder, {
  action as newOrderaction,
} from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import { action as priorityAction } from "./features/order/UpdateOrderPriority";
import Error from "./ui/Error";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "cart",
        element: <Cart />,
      },

      {
        path: "order/new",
        element: <CreateOrder />,
        action: newOrderaction,
        errorElement: <Error />,
      },
      {
        path: "order/:orderId",
        element: <Order />,
        loader: orderLoader,
        action: priorityAction,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
