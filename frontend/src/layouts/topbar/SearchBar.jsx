import classNames from "classnames";
import { debounce } from "lodash";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = ({ className, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

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
        className="w-full h-full rounded-md px-2 py-1 "
      />
      <AiOutlineSearch className="absolute right-2 top-2" color="gray" size={20} />
    </div>
  );
};

export default SearchBar;
