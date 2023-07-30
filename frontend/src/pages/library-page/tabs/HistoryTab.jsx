import React from "react";
import { useSelector } from "react-redux";
import loading_gif from "../../../assets/images/loading-gif.gif";
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
        // <img
        //   src={loading_gif}
        //   className="w-[50px] h-[50px] left-0 right-0 m-auto top-10"
        // />
      )}
    </>
  );
};

export default HistoryTab;
