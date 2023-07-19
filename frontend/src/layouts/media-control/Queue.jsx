import React, { useEffect, useState } from "react";
import {GrClose} from "react-icons/gr";
import PlaylistTrackCard from "../../components/playlist/PlaylistTrackCard";

const Queue = () => {
  const [queueList, setQueueList] = useState();
  const [isShowed, setIsShowed] = useState(true );

  useEffect(() => {
    const getPlaylist = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"))["jwtToken"];
        const url = `${process.env.REACT_APP_API_BASE_URL}/playlists/6`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const playlistData = await response.json();
        setQueueList(playlistData);
      } catch (error) {
        console.error(
          "An error occurred while retrieving the playlist:",
          error
        );
        // Handle network or other errors
      }
    };
    getPlaylist();
  }, []);

  return (
    <>
      {isShowed ? (
        <div className="absolute right-2 bottom-[56px] border boder-solid shadow-sm h-[600px] w-[500px] bg-white">
          {/* header */}
          <div className="flex flex-row justify-between border-b item-center px-5 py-4">
            <h1 className="text-xl">Next up</h1>
            <div className="flex flex-row justify-center">
              <button className="border px-2 py-1 mr-3">Clear</button>
              <button><GrClose className="text-xl"/></button>
            </div>
          </div>
          {queueList ? (<>{
            queueList.tracks.map((track, index) => (
              <PlaylistTrackCard track={track}/>
            ))
             }</>) : (
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
