import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;

    navigate(`/order/${query}`);

    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="input w-40 tracking-wide transition-all duration-300 focus:w-44 sm:w-64 sm:focus:w-80"
        type="text"
        placeholder="Search Order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
