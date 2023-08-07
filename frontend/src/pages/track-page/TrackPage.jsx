import React, { useEffect, useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTrack } from "../../apis/track/getTrack";
import FavoriteButton from "../../components/buttons/FavoriteButton";
import Follow from "../../components/buttons/FollowButton";
import MoreButton from "../../components/buttons/MoreButton";
import Comment from "../../components/comment/Comment";
import CommentInput from "../../components/comment/CommentInput";
import SideBar from "../../components/side-bar/SideBar";
import Waveform from "../../components/waveform/Waveform";
import CopyLinkButton from "../../components/buttons/CopyLinkButton";
import { BiSolidComment } from "react-icons/bi";

const TrackPage = () => {
  const { trackId } = useParams();
  const [track, setTrack] = useState("");
  const [comments, setComments] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const playing = useSelector((state) => state.playingReducer);
  const userId = useSelector((state) => state.userReducer.id);

  const playTrack = () => {
    dispatch({
      type: "PLAY_TRACK",
      track: track,
    });
  };

  useEffect(() => {
    if (!playing) return;
    if (playing.track.id == track.id && playing.isPlaying == true)
      setIsPlaying(true);
    else setIsPlaying(false);
  }, [playing]);

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
        console.log(track);
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
                  onClick={playTrack}
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

          {/* main section */}
          <div className="flex px-8 mt-5">
            <div className="w-[72%] border-r-[1px] border-solid pr-8">
              {/* comment input */}
              <CommentInput
                className={"mb-4"}
                trackId={track.id}
                setComments={setComments}
              />
              {/* interact button & info*/}
              <div className={"border-b pb-3 flex justify-between"}>
                {/* interact button */}
                <div className="flex">
                  <FavoriteButton
                    haveBorder={true}
                    haveText={true}
                    className={"mr-2"}
                    track={track}
                  />
                  <CopyLinkButton
                    haveBorder={true}
                    haveText={true}
                    className={"mr-2"}
                  />
                  <MoreButton haveBorder={true} haveText={true} />
                </div>
                {/* info */}
                <div className="text-[#999] flex">
                  <div
                    title={`${track.listenedTime} plays`}
                    className="flex items-center"
                  >
                    <BsFillPlayFill />
                    <div>{track.listenedTime}</div>
                  </div>
                  <div className="flex items-center">
                    <BsFillPauseFill />
                    <div>0</div>
                  </div>
                  <div
                    title={`${Object.keys(track.comments).length} comments`}
                    className="flex items-center"
                  >
                    <BiSolidComment />
                    <div>{Object.keys(track.comments).length}</div>
                  </div>
                </div>
              </div>

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
                  {track.user.id !== userId && <Follow user={track.user} />}
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
            <div className="w-[28%] pl-8 text-[#999] text-[14px]">
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

export default TrackPage;
