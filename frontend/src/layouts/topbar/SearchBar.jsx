import classNames from "classnames";
import { debounce } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { search } from "../../apis/track/search";
import PlaylistTrackCard from "../../components/playlist/PlaylistTrackCard";
import loadingGif from "../../assets/icons/loading.gif";

const SearchBar = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [display, setDisPlay] = useState(false);

  const mySearchRef = useRef(null);
  const onSearch = async (query) => {
    try {
      if (!display) {
        document.addEventListener("click", handleClickOutside);
        setDisPlay(true);
      }

      setLoading(true);

      const searchResponse = await search(query);
      setLoading(false);
      setResult(searchResponse);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const handleClickOutside = (event) => {
    if (mySearchRef.current && !mySearchRef.current.contains(event.target)) {
      setDisPlay(false);
      document.removeEventListener("click", handleClickOutside);
    }
  };
  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value.trim());
    if (e.target.value.trim() == "") {
      setResult("");
      setDisPlay(false);
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

  return (
    <div
      className={`relative lg:w-full h-full focus:outline-none mx-2 order-1 lg:order-none items-center flex lg:h-11 flex-1 lg:px-5 mt-2 lg:mt-0 ${className}`}
      ref={mySearchRef}
    >
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleQueryChange}
        className="w-full bg-[#e5e5e5] h-7 rounded-md px-2 py-1 focus:outline-none"
      />
      <AiOutlineSearch
        className="absolute m-auto right-5"
        color="gray"
        size={20}
      />
      {display && (
        <div className="absolute top-11 w-full">
          {searchQuery ? (
            <div className="w-full bg-[#262626] text-white p-5">
              Search for "{searchQuery}"
            </div>
          ) : (
            <></>
          )}

          {loading ? (
            <div className="flex justify-center p-2 bg-black">
              <img src={loadingGif} alt="" width={50} />
            </div>
          ) : result ? (
            <div className="p-2 bg-black">
              {result.map((track, index) => (
                <PlaylistTrackCard
                  track={track}
                  key={index}
                  isGradient={true}
                />
              ))}
            </div>
          ) : (
            <div>Nothing Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
