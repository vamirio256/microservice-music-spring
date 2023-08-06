import React, { useEffect, useRef, useState } from "react";
import { BiSolidPlaylist } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Favorite from "../../components/buttons/FavoriteButton";
import PlaybackTimeLine from "./PlaybackTimeLine";
import Queue from "./Queue";
import VolumeControl from "./VolumeControl";
import LoopButton from "./buttons/LoopButton";
import NextButton from "./buttons/NextButton";
import PlayButton from "./buttons/PlayButton";
import PreviousButton from "./buttons/PreviousButton";
import ShuffleButton from "./buttons/ShuffleButton";

const MediaControl = () => {
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(0);
  const [isShowed, setIsShowed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const playing = useSelector((state) => state.playingReducer);
  const VOLUME_MAX = 100;

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
    dispatch({
      type: "UPDATE_PROGRESS",
      progress: (currentTime / duration) * 100,
    });
  }

  useEffect(() => {
    if (audioRef.current) {
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
            <PreviousButton />
            <PlayButton />
            <NextButton />
            <ShuffleButton />
            <LoopButton />
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

          <div className="flex items-center">
            {/* volume control */}
            <div className="order-2 lg:order-none">
              <VolumeControl
                VOLUME_MAX={VOLUME_MAX}
                handleVolume={handleVolume}
              />
            </div>

            {/* track info */}
            <div className="flex flex-row mx-3 max-w-[200px]">
              <img
                src={playing.track.coverUrl}
                className="h-[30px] w-[30px] mr-5"
              />
              <div className="flex flex-col">
                <Link to={`/track/${playing.track.id}`} className="">
                  {playing.track.name}
                </Link>
                <Link
                  to={`/user/${playing.track.user.id}`}
                  className="text-[11px] text-gray-400"
                >
                  {playing.track.user.username}
                </Link>
              </div>
            </div>

            {/* favorite, follow, queue */}
            <div className="flex flex-row item-center justify-center">
              <Favorite track={playing.track} className="relative top-0.5" />
              <BiSolidPlaylist
                size={15}
                className="ml-2 cursor-pointer"
                onClick={() => setIsShowed(!isShowed)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MediaControl;
