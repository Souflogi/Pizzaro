import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import { selectUsername } from "../features/user/userSlice";
import Button from "./Button";
import { Link } from "react-router-dom";

function Home() {
  const username = useSelector(selectUsername);

  return (
    <div className="my-10 text-center sm:my-16 md:py-5">
      <h1 className="mb-8 text-center text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-[#d24038]">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {!username ? (
        <CreateUser />
      ) : (
        <Button size="md" to="/menu" as={Link}>
          Pizza Menu
        </Button>
      )}
    </div>
  );
}

export default Home;
