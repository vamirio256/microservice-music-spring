import classNames from "classnames";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState();

  const onSearch = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"))["jwtToken"];
      const url = `${process.env.REACT_APP_API_BASE_URL}/tracks/search?query={searchQuery}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setResult(data);
      } else {
        setResult();
      }
    } catch (error) {
      console.error("An error occurred while retrieving the playlist:", error);
      // Handle network or other errors
    }
  };

  const handleSearch = (searchQuery) => {
    onSearch(searchQuery);
  };

  const handleQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    // debounce sarch in 500ms
    debounce(onSearch(searchQuery), 500);
  };

  const searchBarClasses = classNames("bg-searchbar_gray ", className);

  return (
    <div className="relative w-96 ml-5 h-8 focus:outline-none">
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleQueryChange}
        className="w-full h-full rounded-md px-2 py-1 focus:outline-none"
      />
      <AiOutlineSearch
        className="absolute right-2 top-2"
        color="gray"
        size={20}
      />
      {searchQuery ? (
        <div className="w-full bg-[#262626] text-white p-5">
          Search for "{searchQuery}"
        </div>
      ) : (
        <></>
      )}
      {result ? result.map((track, index) => <div className="w-100%"></div>) : <></>}
    </div>
  );
};

export default SearchBar;
