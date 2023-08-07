import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import PlaylistTrackCard from "../../components/playlist/PlaylistTrackCard";
import { useDispatch, useSelector } from "react-redux";

const Queue = ({ isShowed, setIsShowed }) => {
  const queue = useSelector((state) => state.queueReducer);
  const dispatch = useDispatch();
  
  const handleEmptyQueue = () => {
    dispatch({
      type: "EMPTY_QUEUE",
    });
  };

  return (
    <>
      {isShowed ? (
        <div className="absolute right-2 bottom-[56px] border boder-solid shadow-sm h-[400px] w-[90%] md:w-[500px] bg-white transition-opacity duration-500 ease-in-out">
          {/* header */}
          <div className="flex flex-row justify-between border-b item-center px-5 py-4">
            <h1 className="text-xl">Next up</h1>
            <div className="flex flex-row justify-center">
              <button
                onClick={handleEmptyQueue}
                className="border px-2 py-1 mr-3"
              >
                Clear
              </button>
              <button>
                <GrClose
                  className="text-xl"
                  onClick={() => setIsShowed(false)}
                />
              </button>
            </div>
          </div>
          {queue ? (
            <>
              {queue.map((track, index) => (
                <PlaylistTrackCard key={index} track={track} />
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Queue;
