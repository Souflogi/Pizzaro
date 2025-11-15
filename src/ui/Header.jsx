import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import User from "../features/user/User";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-[#f1c27d] bg-[#d24038] px-3 py-2.5 text-[#fff8ec] shadow-sm sm:px-6">
      <Link to="/" className="text-lg font-semibold tracking-[8px] text-[#fffdf4]">
        Pizzaro.
      </Link>
      <SearchOrder />
      <User />
    </header>
  );
}

export default Header;
