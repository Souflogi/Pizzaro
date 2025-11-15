import { useSelector } from "react-redux";
import { selectUsername } from "./userSlice";

function User() {
  const username = useSelector(selectUsername);

  if (!username) return;
  return (
    <div className="hidden text-sm font-semibold uppercase md:block">
      {username}
    </div>
  );
}

export default User;
