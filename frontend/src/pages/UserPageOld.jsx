import React, { useState } from "react";

import { AiFillPlayCircle, AiOutlineMore } from "react-icons/ai";
import { PlaylistItem } from "../components/PlaylistItem";
import { BsShare } from "react-icons/bs";
import { TrackItemUser } from "../components/TrackItemUser";

const UserPageOld = () => {
  const [active_tab, set_active_tab] = useState("All");
  const active_style = "text-primary border-b-2 border-b-primary border-solid";
  const hover = " hover:border-b-2 hover:border-b-black hover:border-solid";
  return (
    <div className="container block m-auto">
      {/* banner user */}
      <div className="w-full h-[200px] bg-gradient-to-r from-indigo-500 to-blue-200 flex items-center pl-10">
        <div className="rounded-full bg-gradient-to-r from-orange to-blue-200 w-[150px] h-[150px]"></div>
      </div>
      {/* Top bar */}
      <div className="mx-9 mt-10 text-lg">
        <button
          className={`${active_tab === "Tracks" ? active_style : hover} mr-9`}
          onClick={() => set_active_tab("Tracks")}
        >
          Tracks
        </button>
        <button
          className={`${
            active_tab === "Playlists" ? active_style : hover
          } mr-9`}
          onClick={() => set_active_tab("Playlists")}
        >
          Playlists
        </button>
        <button
          className={active_tab === "All" ? active_style : hover}
          onClick={() => set_active_tab("All")}
        >
          All
        </button>
      </div>
      {/* content */}
      <div className="mx-9">
        {/* playlist */}
        <div className={active_tab === "Playlists" ? "block" : "hidden"}>
          <div className="flex mb-2 mt-5">
            {/* image right */}
            <div>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
                className="object-cover w-[120px] h-[120px]"
              />
            </div>

            {/* right information */}
            {/* playlist info */}
            <div className="pl-2">
              <div className="flex mb-2">
                {/* playbtn */}
                <div>
                  <AiFillPlayCircle className="text-orange text-5xl mx-2" />
                </div>
                {/* infop */}
                <div>
                  <div className="text-gray-500 text-xs">Ronboogz</div>
                  <div className="py-1 text-sm">
                    Don't Côi - Ronboogz x RPT Orijinn
                  </div>
                </div>
              </div>
              {/* list tracks of playlist */}
              <div>
                <PlaylistItem /> <PlaylistItem /> <PlaylistItem />{" "}
                <PlaylistItem />
              </div>
            </div>
          </div>
        </div>
        {/* tracks */}
        <div className={active_tab === "Tracks" ? "block" : "hidden"}>
          <TrackItemUser /> <TrackItemUser /> <TrackItemUser />
          <TrackItemUser />
        </div>
        <div className={active_tab === "All" ? "block" : "hidden"}>All</div>
      </div>
    </div>
  );
};

export default UserPageOld;
