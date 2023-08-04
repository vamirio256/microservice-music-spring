import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import loading_gif from "../../../assets/icons/loading.gif";
import TrackSwiper from "../../../components/trackcard/TrackSwiper";

const HistoryTab = () => {
  const historySongs = useSelector((state) => state.historyReducer);

  const historyPlaylist = {
    name: "History",
    tracks: historySongs,
  };
  return (
    <>
      {!historySongs.length == 0 ? (
        <TrackSwiper playlist={historyPlaylist} />
      ) : (
        <p className="text-xl mt-5">You haven't listened any tracks!</p>
      )}
    </>
  );
};

export default HistoryTab;
