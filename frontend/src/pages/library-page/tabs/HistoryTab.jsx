import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import loading_gif from "../../../assets/icons/loading.gif";
import TrackSwiper from "../../../components/track/TrackSwiper";
import TrackCard from "../../../components/track/TrackCard";
import PlaceholderItem from "../../../components/placeholder/PlaceholderItem";

const HistoryTab = () => {
  const history = useSelector((state) => state.historyReducer);

  return (
    <>
      <div className="flex flex-row justify-between">
        <p className="font-normal text-[#999]">Recently played:</p>
        <div>
          <button className="px-1 py-0.5 border hover:border-[#999] rounded-sm text-xs">Clear all history</button>
          <input placeholder="Filter" className="rounded-[3px] p-2 border border-[#ccc] outline-none focus:border-[#999] text-xs" />
        </div>
      </div>
      
      {/* tracks */}
      <div className="grid grid-cols-6 gap-6">
      {!history.length == 0 && (
        history.map((track, index) => <TrackCard track={track} key={index} />)
      )}

      {Array.from({ length: Math.max(0, 6 - history.length) }).map((_, index) => (
          <PlaceholderItem key={index} />
        ))}
        </div>
    </>
  );
};

export default HistoryTab;
