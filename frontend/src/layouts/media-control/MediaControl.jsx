import React, { useEffect, useRef, useState } from "react";
import {
  BsFillSkipEndFill,
  BsFillSkipStartFill,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
  BsRepeat,
} from "react-icons/bs";
import {BiSolidPlaylist } from "react-icons/bi"
import VolumeControl from "./VolumeControl";
import PlaybackTimeLine from "./PlaybackTimeLine";
import { formatDuration } from "../../utils/formatDuration";
import { useDispatch, useSelector } from "react-redux";
import Queue from "./Queue";

const MediaControl = () => {
  const audioRef = useRef(null);
  // const [isPLaying, setIsPlaying] = useState(false);

  // playing redux
  const dispatch = useDispatch();
  const progress = useSelector((state) => state.progressReducer);

  const [duration, setDuration] = useState(0);
  // const [progress, setProgress] = useState(0);

  const [currentTime, setCurrentTime] = useState(0);

  const VOLUME_MAX = 100;

  const currentSong = useSelector((state) => state.currentSongReducer);

  const toggleAudio = () => {
    if (currentSong.isPlaying) {
      // audioRef.current?.pause();
      dispatch({
        type: "CHANGESONG",
        song: { ...currentSong, isPlaying: false },
      });
      // setIsPlaying(false);
    } else {
      // void audioRef.current?.play();
      dispatch({
        type: "CHANGESONG",
        song: { ...currentSong, isPlaying: true },
      });
      // setIsPlaying(true);
    }
  };

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
      type: "CHANGEPROGRESS",
      progress: (currentTime / duration) * 100,
    });
    // setProgress((currentTime / duration) * 100);
  }
  useEffect(() => {
    if (!currentSong) {
      return;
    }

    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
    };

    if (currentSong.isPlaying) {
      audioRef.current?.play();

      // add to history when play song
      dispatch({
        type: "ADDSONG",
        song: { ...currentSong },
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
  }, [currentSong]);

  const buttonStyle = "text-xl ml-3";
  // console.log(currentTime);

  return (
    currentSong && (
      <div className="sticky bottom-0 w-full z-10 bg-[#f2f2f2] border-[#ccc] border-t text-xs flex justify-center">
        <audio
          ref={audioRef}
          src={currentSong.audioUrl}
          onTimeUpdate={onPlaying}
        />

        <div className="w-[1240px] flex flex-row justify-between items-center h-[48px] relative">
          {/* queue */}
          <Queue />
          {/* control button */}
          <div className="flex flex-row">
            <button>
              {/* play previous */}
              <BsFillSkipStartFill className={`${buttonStyle}`} />
            </button>
            {/* play btn */}
            <button onClick={toggleAudio}>
              {!currentSong.isPlaying ? (
                <BsFillPlayFill className={`${buttonStyle}`} />
              ) : (
                <BsFillPauseFill className={`${buttonStyle}`} />
              )}
            </button>
            <button>
              {/* playnext */}
              <BsFillSkipEndFill className={`${buttonStyle}`} />
            </button>
            <button>
              <BsShuffle
                className={`${buttonStyle}`}
                style={{ fontSize: "1.15rem" }}
              />
            </button>
            <button>
              <BsRepeat
                className={`${buttonStyle}`}
                style={{ fontSize: "1.15rem" }}
              />
            </button>
          </div>

          {/* track control */}
          <div className="flex justify-center items-center">
            {/* current time */}
            <p className="text-xs mr-4 text-[#f50]">
              {formatDuration(currentTime.toFixed(0))}
            </p>

            <PlaybackTimeLine
              progress={progress}
              handleTimeline={handleTimeline}
            />

            {/* total duration */}
            <p>{formatDuration(duration.toFixed(0))}</p>
          </div>

          {/* volume control */}
          <div className="">
            <VolumeControl
              VOLUME_MAX={VOLUME_MAX}
              handleVolume={handleVolume}
            />
          </div>

          {/* track info */}
          <div className="flex flex-row">
            <img
              src={currentSong.coverUrl}
              className="h-[30px] w-[30px] mr-5"
            />
            <div>
              <p>{currentSong.title}</p>
              <p>{currentSong.artist}</p>
            </div>
          </div>

          {/* favorite, queue */}
          <div>
            <BiSolidPlaylist />
          </div>
        </div>
      </div>
    )
  );
};

export default MediaControl;
