import React, { useEffect, useState } from "react";
import Waveform from "../waveform/Waveform";
import CommentInput from "../comment/CommentInput";
import FavoriteButton from "../buttons/FavoriteButton";
import ShareButton from "../buttons/ShareButton";
import CopyLinkButton from "../buttons/CopyLinkButton";
import MoreButton from "../buttons/MoreButton";
import { useDispatch, useSelector } from "react-redux";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import DeleteButton from "../buttons/DeleteButton";
import { deleteTrack } from "../../apis/track/deleteTrack";

const TrackWaveform = ({ track, className, haveOnDelete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();
  const playing = useSelector((state) => state.playingReducer);

  const playTrack = (track) => {
    dispatch({
      type: "PLAY_TRACK",
      track: track,
    });
    setIsPlaying(true);
  };

  const pauseTrack = (track) => {
    dispatch({
      type: "PLAY_TRACK",
      track: track,
    });
    setIsPlaying(false);
  };

  const handleDeleteTrack = async () => {
    const response = await deleteTrack(track.id);
    if (response.ok) {
      dispatch({
        type: "APPEND_NOTIFICATION",
        text: "Link has been copied to the clipboard!",
        icon: "success",
      });
      dispatch({
        type: "REMOVE_TRACK",
        id: track.id,
      });
    } else {
      dispatch({
        type: "APPEND_NOTIFICATION",
        text: "Error in deleting track!",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    if (!playing) {
      return;
    }
    if (playing.track.id === track.id && playing.isPlaying === true)
      setIsPlaying(true);
    else setIsPlaying(false);
  }, [playing.track, playing.isPlaying]);

  return (
    <div className={`flex flex-col md:flex-row ${className}`}>
      <Link to={`/track/${track.id}`} className="min-w-fit flex justify-center">
        <img
          src={track.coverUrl}
          alt="track cover"
          className="w-[176px] h-[176px]"
        />
      </Link>

      {/* playbutton, track name, user */}
      <div className="w-full ml-4">
        <div className="flex mb-5">
          {/* play button */}
          {!isPlaying ? (
            <BsFillPlayFill
              className="text-4xl bg-[#f50] text-white rounded-full p-[5px] cursor-pointer"
              onClick={() => playTrack(track)}
            />
          ) : (
            <BsFillPauseFill
              className="text-4xl bg-[#f50] text-white rounded-full p-[5px] cursor-pointer"
              onClick={() => pauseTrack(track)}
            />
          )}

          <div className="ml-3 flex flex-col">
            <Link
              to={`/user/${track.user.id}`}
              className="username text-[#999] text-xs cursor-pointer"
            >
              {track.user.username}
            </Link>
            <Link
              to={`/track/${track.id}`}
              className="text-[14px] cursor-pointer"
            >
              {track.name}
            </Link>
          </div>
        </div>

        <Waveform audioUrl={track.audioUrl} />
        <CommentInput className={"mt-5"} />

        {/* interact button */}
        <div className="flex mt-3 flex-wrap">
          <FavoriteButton
            track={track}
            haveBorder={true}
            haveText={true}
            className={"mr-2 mb-2"}
          />
          <ShareButton haveBorder={true} haveText={true} className={"mr-2"} />
          <CopyLinkButton
            haveBorder={true}
            haveText={true}
            className={"mr-2"}
          />
          {haveOnDelete && (
            <DeleteButton
              haveBorder={true}
              haveText={true}
              onDelete={handleDeleteTrack}
              title={"Permanently delete this track?"}
              context={`Removing this track is irreversible. You will lose all the plays, likes and comments for this track with no way to get them back.`}
              className={"mr-2"}
            />
          )}
          <MoreButton haveBorder={true} haveText={true} className={"mr-2"} />
        </div>
      </div>
    </div>
  );
};

export default TrackWaveform;
