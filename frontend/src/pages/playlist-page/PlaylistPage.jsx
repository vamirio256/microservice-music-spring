import React, { useEffect, useState } from "react";
import Waveform from "../../components/waveform/Waveform";
import { useNavigate, useParams } from "react-router-dom";
import { getTrack } from "../../apis/track/getTrack";
import TrackCard from "../../components/trackcard/TrackCard";
import InteractButton from "../../components/InteractButton";
import CommentInput from "../../components/comment/CommentInput";
import SideBar from "../../components/side-bar/SideBar";
import Comment from "../../components/comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import { FaPlay } from "react-icons/fa";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import Follow from "../../components/buttons/FollowButton";

const PlaylistPage = ({ playlist }) => {
  const { playlistId } = useParams();
  const [track, setTrack] = useState("");
  const [comments, setComments] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleAudio = () => {
    dispatch({
      type: "PLAY_TRACK",
      track: track,
    });
    dispatch({
      type: "APPEND_HISTORY",
      track: track,
    });
    dispatch({
      type: "APPEND_QUEUE",
      track: track,
    });
  };

//   useEffect(() => {
//     if (!currentSong || currentSong.audioUrl != track.audioUrl) {
//       setIsPlaying(false);
//     } else {
//       setIsPlaying(currentSong.isPlaying);
//     }
//   }, [currentSong]);

  useEffect(() => {
    const getTrackOnInitial = async () => {
      try {
        const response = await getTrack(trackId);

        if (response.status == 404) {
          navigate("/not-found");
          return;
        }
        const track = await response.json();

        setTrack(track);
        setComments(track.comments);
      } catch (e) {
        console.error(e);
      }
    };

    getTrackOnInitial();
  }, []);

  return (
    <>
      {track ? (
        <div>
          <div className="w-full bg-gradient-to-tl from-[#A19793] to-[#827A60] p-5 flex flex-row justify-between items-center">
            <div className="w-full h-full flex flex-col justify-start">
              <div className="flex flex-row mb-[150px]">
                {/* play button */}
                <button
                  className="rounded-full bg-[#f30] h-[60px] w-[60px] flex justify-center items-center mr-5"
                  onClick={toggleAudio}
                >
                  {/* play btn */}

                  {!isPlaying ? (
                    <BsFillPlayFill className="text-white" size={40} />
                  ) : (
                    <BsFillPauseFill className="text-white" size={40} />
                  )}

                  {/* <FaPlay className="text-white" /> */}
                </button>
                <div>
                  <p className="text-white text-xl bg-black p-2 w-fit mb-2">
                    {track.name}
                  </p>
                  <p className="username text-gray-300 text-sm bg-black p-3 w-fit mb-2">
                    {track.user.username}
                  </p>
                </div>
              </div>
              <Waveform audioUrl={track.audioUrl} />
            </div>

            {/* track cover */}
            <img src={track.coverUrl} className="w-[340px] h-[340px] ml-5" />
          </div>
          <div className="flex pl-8 pr-8">
            <div className="w-[72%] border-r-[1px] border-solid pt-3 pr-8">
              {/* interact button */}
              <InteractButton className={"border-b pb-3"} />

              {/* comments and artist summary */}
              <div className="flex flex-row justify-between mt-2">
                {/* artist summary */}
                <div className="mr-5 min-w-fit">
                  <img
                    src={track.user.avatarUrl}
                    className="w-[120px] h-[120px] rounded-full"
                  />
                  <h3 className="text-sm mb-2 mt-2">{track.user.username}</h3>

                  {/* follow button */}
                  <Follow user={track.user} />
                </div>

                <div className="w-full">
                  <div className="border-b w-full">
                    <p>{Object.keys(track.comments).length} comments</p>
                  </div>
                  {comments.map((comment, index) => (
                    <Comment comment={comment} key={index} />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-[28%] pl-8 pt-8 text-[#999] text-[14px]">
              <SideBar />
            </div>
          </div>
        </div>
      ) : (
        <img src="../../assets/images/loading-gif.gif" />
      )}
    </>
  );
};

export default PlaylistPage;
