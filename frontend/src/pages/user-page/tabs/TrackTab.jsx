import React from "react";
import TrackWaveform from "../../../components/track/TrackWaveform";
import empty_track from "../../../assets/images/empty/empty_track.png";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const TrackTab = ({ user }) => {
  const currentUser = useSelector((state) => state.userReducer);
  const tracks = useSelector((state) => state.userReducer.profile.tracks);
  return (
    <>
      {tracks.length != 0 ? (
        <div className="">
          {tracks.map((track, index) => (
            <TrackWaveform
              track={track}
              key={index}
              haveOnDelete={true}
              className={"mb-5"}
            />
          ))}
        </div>
      ) : (
        <div className="h-2/3 w-full flex justify-center items-center flex-col">
          <img src={empty_track} alt="empty track" className="w-[240px] " />
          {currentUser.id !== user.id ? (
            <>
              <h2 className="mt-6 mb-2 text-[18px]">Nothing to hear here</h2>
              <p className="text-[#999] text-sm font-extralight">
                Follow {user.username} for updates on sounds they share in the
                future.
              </p>
            </>
          ) : (
            <>
              <h2 className="mt-6 mb-2 text-[18px]">
                Seem a little quiet over here
              </h2>
              <p className="text-[#38d] text-sm font-extralight mb-3">
                Upload a track to share it with your followers.
              </p>
              <Link to="/upload" className="px-3 py-1 bg-[#f50] text-white">
                Upload now
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default TrackTab;
