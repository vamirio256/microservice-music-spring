import React, { useEffect, useRef, useState } from "react";
import {
  BsFillSkipEndFill,
  BsFillSkipStartFill,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
  BsRepeat,
} from "react-icons/bs";
import image from "../../images/temp_track_cover.jfif";
import VolumeControl from "./VolumeControl";
import PlaybackTimeLine from "./PlaybackTimeLine";
import { formatDuration } from "../../utils/formatDuration";

const MediaControl = () => {
  const audioRef = useRef(null);
  const [isPLaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioSrc, setAudioSrc] = useState("");
  const VOLUME_MAX = 100;

  const [track, setTrack] = useState({
    imageUrl: image,
    artist: "Related tracks",
    title: "SSK - Nhat Ky Ngoai Tu",
    trackUrl: "http://127.0.0.1:5500/public/Nujabes_Feather.mp3",
  });

  const toggleAudio = () => {
    if (isPLaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      void audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleVolume = (e) => {
    const { value } = e.target;
    const volume = Number(value) / VOLUME_MAX;
    audioRef.current.volume = volume;
  };

  const handleTimeline = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
  };

  const fetchAudio = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_AWS_BASE_URL}/track-audio/fdbd4c55-066f-48b0-a088-ec09031508b8`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const blob = await response.blob();
      setAudioSrc(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
  };

  useEffect(() => {
    fetchAudio();
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current.duration);
      });
    }
  }, []);

  const buttonStyle = "text-xl ml-3";

  return (
    <div className="sticky bottom-0 w-full z-10 bg-[#f2f2f2] border-[#ccc] border-t text-xs flex justify-center">
      <div className="w-[1240px] flex flex-row justify-between items-center h-[48px]">
        {/* control button */}
        <div className="flex flex-row">
          <button>
            <BsFillSkipStartFill className={`${buttonStyle}`} />
          </button>
          <button onClick={toggleAudio}>
            {!isPLaying ? (
              <BsFillPlayFill className={`${buttonStyle}`} />
            ) : (
              <BsFillPauseFill className={`${buttonStyle}`} />
            )}
          </button>
          <button>
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
            {formatDuration(currentTime.toFixed(2))}
          </p>

          <PlaybackTimeLine
            duration={duration}
            currentTime={currentTime}
            handleTimeline={handleTimeline}
          />

          {/* total duration */}
          <p>{formatDuration(duration.toFixed(2))}</p>

          <audio ref={audioRef} src={audioSrc} />
        </div>
        {/* volume control */}
        <div className="">
          <VolumeControl VOLUME_MAX={VOLUME_MAX} handleVolume={handleVolume} />
        </div>
        <div className="flex flex-row">
          <img src={audioSrc} className="h-[30px] w-[30px]" />
          <div>
            <p>{track.title}</p>
            <p>{track.artist}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaControl;
