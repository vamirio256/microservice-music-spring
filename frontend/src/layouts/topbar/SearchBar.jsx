import classNames from "classnames";
import { debounce } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { search } from "../../apis/track/search";
import PlaylistTrackCard from "../../components/playlist/PlaylistTrackCard";

const SearchBar = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState();

  const onSearch = async (query) => {
    try {
      const searchResponse = await search(query);
      setResult(searchResponse);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value.trim());
    if (e.target.value.trim() == "") {
      setResult("");
    } else {
      onSearch(e.target.value.trim());
    }
  };

  // const debouncedSearch = () =>{

  //   timeoutRef.current = setTimeout(() => {
  //     if (searchQuery == "") {
  //       console.log("search is null");
  //       setResult("");
  //     } else {
  //       onSearch(debouncedSearchQuery);
  //     }
  //   }, 500);
  // }

  const debounce = (func) => {
    let timeoutId;

    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, 500);
    };
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
      {result ? (
        <div className="p-2 bg-black">
          {result.map((track, index) => (
            <PlaylistTrackCard track={track} key={index} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchBar;
