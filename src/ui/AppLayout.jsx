import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import Loader from "./Loader";
// import LearnPractice from "./LearnPractice";
function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-dvh grid-rows-[auto_1fr_auto] bg-[#fff0e0] text-[#3a1f16]">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-y-scroll">
        <main className="mx-auto flow-root max-w-3xl">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
