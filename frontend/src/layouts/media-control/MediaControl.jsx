import React, { useEffect, useRef, useState } from "react";
import { PiPlaylistBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FavoriteButton from "../../components/buttons/FavoriteButton";
import FollowButton from "../../components/buttons/FollowButton";
import PlaybackTimeLine from "./PlaybackTimeLine";
import VolumeControl from "./VolumeControl";
import LoopButton from "./buttons/LoopButton";
import NextButton from "./buttons/NextButton";
import PlayButton from "./buttons/PlayButton";
import PreviousButton from "./buttons/PreviousButton";
import ShuffleButton from "./buttons/ShuffleButton";
import Queue from "./queue/Queue";

const MediaControl = () => {
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(0);
  const [isShowed, setIsShowed] = useState(false);

  const [loop, setLoop] = useState(0);

  const [currentTime, setCurrentTime] = useState(0);
  const playing = useSelector((state) => state.playingReducer);
  const userId = useSelector((state) => state.userReducer.id);
  const VOLUME_MAX = 100;

  const nextButtonRef = useRef(null);
  const handleVolume = (e) => {
    const { value } = e.target;
    const volume = Number(value) / VOLUME_MAX;
    audioRef.current.volume = volume;
  };

  const handleTimeline = (e) => {
    const currentTimeLine = e.target.value;
    const time = (duration * currentTimeLine) / 100;
    audioRef.current.currentTime = time;
  };

  function onPlaying() {
    const duration = audioRef.current.duration;
    const currentTime = audioRef.current.currentTime;

    setCurrentTime(currentTime);
    // kết thúc bài nhạc
    if (currentTime == duration) {
      if (loop == 1) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        nextButtonRef.current.playNext();
      }
    }
    dispatch({
      type: "UPDATE_PROGRESS",
      progress: (currentTime / duration) * 100,
    });
  }

  useEffect(() => {
    if (audioRef.current && playing.waveformProgress) {
      audioRef.current.currentTime = playing.waveformProgress;
    }
  }, [playing.waveformProgress]);

  useEffect(() => {
    if (!playing.track) {
      return;
    }

    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
    };

    if (playing.isPlaying) {
      audioRef.current?.play();

      // add to history when play song
      dispatch({
        type: "APPEND_HISTORY",
        track: { ...playing.track },
      });
    } else {
      audioRef.current?.pause();
    }

    audioRef.current?.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      audioRef.current?.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );
    };
  }, [playing.track, playing.isPlaying]);

  const mediaButton = "text-xl ml-2 lg:ml-5";

  return (
    playing.track !== null &&
    playing.track !== undefined && (
      <div className="sticky bottom-0 pb-5 lg:pb-0 w-full z-10 bg-[#f2f2f2] border-[#ccc] border-t text-xs flex justify-center px-2">
        <audio
          ref={audioRef}
          src={playing.track.audioUrl}
          onTimeUpdate={onPlaying}
        />

        <div className="w-[1240px] flex flex-row justify-between items-center h-[48px] relative">
          {/* queue */}
          <Queue isShowed={isShowed} setIsShowed={setIsShowed} />
          {/* control button */}
          <div className="flex flex-row">
            <PreviousButton className={mediaButton} />
            <PlayButton className={mediaButton} />
            <NextButton
              className={mediaButton}
              ref={nextButtonRef}
              loop={loop}
            />
            <ShuffleButton className={mediaButton} />
            <LoopButton className={mediaButton} setLoop={setLoop} loop={loop} />
          </div>

          {/* track control */}
          <div className="flex justify-center items-center">
            <PlaybackTimeLine
              progress={playing.currentProgress}
              handleTimeline={handleTimeline}
              currentTime={currentTime}
              duration={duration}
            />
          </div>
          {/* volume control */}
          <div className="order-2 lg:order-none">
            <VolumeControl
              VOLUME_MAX={VOLUME_MAX}
              handleVolume={handleVolume}
            />
          </div>
          {/* track info */}
          <div className="flex flex-row mx-3 max-w-[200px] items-center">
            <Link to={`/track/${playing.track.id}`}>
              <img
                src={playing.track.coverUrl}
                className="h-[35px] w-[35px] mr-1 lg:mr-5 border"
              />
            </Link>

            <div className="flex flex-col justify-center truncate">
              <Link to={`/track/${playing.track.id}`}>
                {playing.track.name}
              </Link>
              <Link
                to={`/user/${playing.track.user.id}`}
                className="username text-[11px] text-gray-400 truncate"
              >
                {playing.track.user.username}
              </Link>
            </div>
          </div>
          {/* favorite, follow, queue */}
          <div className="flex flex-row items-center justify-center">
            <FavoriteButton
              track={playing.track}
              className={"!bg-[#f2f2f2] mr-2"}
            />
            {playing.track.user.id !== userId && (
              <FollowButton
                user={playing.track.user}
                className={"!bg-[#f2f2f2] mr-1"}
              />
            )}
            <PiPlaylistBold
              className="text-[17px] ml-2 cursor-pointer mr-2"
              onClick={() => setIsShowed(!isShowed)}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default MediaControl;
