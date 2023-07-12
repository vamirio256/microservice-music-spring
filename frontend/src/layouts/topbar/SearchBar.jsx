import { useState } from "react";
import { useHistory } from "react-router-dom";
import { debounce } from "lodash";

const SearchBar = ({ className, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();

  const handleSearch = (searchQuery) => {
    onSearch(searchQuery);
  };

  const handleQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    // debounce sarch in 500ms
    debounce(onSearch(searchQuery), 500);
  };

  const searchBarClasses = className(
    "bg-searchbar_gray ",
   className);

  return (
    <div className="relative">
      <input type="text" value={searchQuery} className={searchBarClasses} placeholder="Search for artist, bands, tracks, podcasts"/>
      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
        <svg
          className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M22 22L15.5 15.5M17 10.5C17 14.0899 14.0899 17 10.5 17C6.91015 17 4 14.0899 4 10.5C4 6.91015 6.91015 4 10.5 4C14.0899 4 17 6.91015 17 10.5Z" />
        </svg>
      </div>
    </div>
  );
};
