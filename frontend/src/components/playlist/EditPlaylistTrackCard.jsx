import React from "react";
import { BsFillPlayFill } from "react-icons/bs";

import { GrClose } from "react-icons/gr";

const EditPlaylistTrackCard = ({ track, removeTrackFromPlaylist }) => {
  return (
    <div
      className={`relative flex flex-row border-solid border-b p-[5px] bg-white justify-between group hover:bg-[#f2f2f2] cursor-pointer text-xs`}
    >
      <div className="flex flex-row min-h-[30px] items-center">
        <img src={track.coverUrl} className="h-[30px] w-[30px] mr-3" />
        <span className="username mr-2 text-[#999]">
          {track.user ? track.user.username : "Undefined"}
        </span>
        <span>&bull;</span>
        <span className="ml-2">{track.name}</span>
      </div>

      {/* total played time */}
      <div className={`flex flex-row text-[#999] items-center`}>
        <span>
          <BsFillPlayFill className="transform" />
        </span>

        <span>{track.listenedTime}</span>

        <span>
          <GrClose
            className="ml-10"
            onClick={() => removeTrackFromPlaylist(track)}
          />
        </span>
      </div>
    </div>
  );
};

export default EditPlaylistTrackCard;
