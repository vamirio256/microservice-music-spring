import { useEffect, useRef, useState } from "react";
import { AiFillPlayCircle, AiOutlineUnorderedList } from "react-icons/ai";

import {
  BiDotsHorizontalRounded,
  BiPause,
  BiSkipNext,
  BiSkipPrevious,
} from "react-icons/bi";
import { BsFileEarmarkMusic, BsFillVolumeUpFill } from "react-icons/bs";
import { CiRedo } from "react-icons/ci";
import { FaRandom } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

const MediaControlOld = (props) => {
  const songs = useSelector((state) => state.songsReducer);
  const currentSong = useSelector((state) => state.currentSongReducer);

  const dispatch = useDispatch();
  const isplaying = useSelector((state) => state.isPlayingReducer);

  // const [isplaying, setisplaying] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(1);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const audio_ref = useRef();
  function playAudio() {
    dispatch({ type: "SETPLAYING", play: !isplaying });
  }
  useEffect(() => {
    if (isplaying) {
      audio_ref.current.play();
    } else {
      audio_ref.current.pause();
    }
  }, [isplaying]);

  function onPlaying() {
    const duration = audio_ref.current.duration;
    const currentTime = audio_ref.current.currentTime;
    currentSong.progress = (currentTime / duration) * 100;
    currentSong.length = duration;
    currentSong.currentTime = currentTime;
    dispatch({
      type: "CHANGESONG",
      song: {
        ...currentSong,
        progress: (currentTime / duration) * 100,
        length: duration,
        currentTime: currentTime,
      },
    });

    if (currentTime >= duration) {
      if (isRepeat) {
        audio_ref.current.currentTime = 0;
        audio_ref.current.play();
      } else if (isRandom) {
        const index = getRndInteger(0, songs.length - 1);
        dispatch({ type: "CHANGESONG", song: songs[index] });
        setTimeout(function () {
          audio_ref.current.play();
        }, 150);
      } else {
        goNext();
      }
    }
  }
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const clickRef = useRef();
  function checkWidth(e) {
    if (!isplaying) {
      dispatch({ type: "SETPLAYING", play: true });
    }
    const length = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const divProgress = (offset / length) * 100;
    audio_ref.current.currentTime = (divProgress / 100) * currentSong.length;
  }
  const audioRef = useRef();

  function checkAudio(e) {
    const length = audioRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    audio_ref.current.volume = offset / length;
    setCurrentVolume(offset / length);
  }
  function secondToMinutes(second) {
    if (second % 60 < 10) {
      return Math.floor(second / 60) + ":0" + Math.floor(second % 60);
    }
    return Math.floor(second / 60) + ":" + Math.floor(second % 60);
  }
  function goPrevious() {
    console.log("hello wrold");
    const index = songs.findIndex((x) => x.title == currentSong.title);
    if (index == 0) {
      songs[songs.length - 1].progress = 0;
      dispatch({ type: "CHANGESONG", song: songs[songs.length - 1] });
    } else {
      songs[index - 1].progress = 0;
      dispatch({ type: "CHANGESONG", song: songs[index - 1] });
    }

    setTimeout(function () {
      dispatch({ type: "SETPLAYING", play: true });
      audio_ref.current.play();
    }, 150);
  }
  function goNext() {
    const index = songs.findIndex((x) => x.title == currentSong.title);
    if (index == songs.length - 1) {
      songs[0].progress = 0;
      dispatch({ type: "CHANGESONG", song: songs[0] });
    } else {
      songs[index + 1].progress = 0;
      dispatch({ type: "CHANGESONG", song: songs[index + 1] });
    }
    setTimeout(function () {
      dispatch({ type: "SETPLAYING", play: true });
      audio_ref.current.play();
    }, 150);
  }

  if (props.currentSong) {
    currentSong.url = props.currentSong.audio;
    currentSong.image = props.currentSong.image;
    currentSong.title = props.currentSong.name;
    currentSong.artist = props.currentSong.artist;
  }

  // useEffect(() => {
  //   dispatch({ type: "SETPLAYING", play: props.isPlaying });
  // }, [props.isPlaying]);

  return (
    <div className="fixed bg-[color:var(--media-control-bg)] z-[300] flex w-full shadow-[0px_-0.2px_5px_0px_rgba(0,0,0,0.75)] h-[48px] bottom-0">
      <audio
        src={currentSong.url}
        ref={audio_ref}
        onTimeUpdate={onPlaying}
      ></audio>

      <div className="relative flex justify-between w-[1240px]">
        {/* media info */}
        <div className="flex items-center w-[200px] px-0 py-2.5">
          <img
            className="shadow-[3px_2px_5px_0px_rgba(0,0,0,0.75)] w-[70px] h-[70px] object-cover rounded-[10px]"
            src={currentSong.image}
          />
          <div className="pl-5">
            <p className="text-[color:var(--grey)] font-semibold text-[13px]">
              {currentSong.title}
            </p>
            <p className="text-[color:var(--grey)] text-sm text-[10px] pt-[5px]">
              {currentSong.artist}
            </p>
          </div>
        </div>
        {/* media control */}
        <div className="pt-2.5">
          <div className="flex justify-center items-center">
            <FaRandom
              size={15}
              color={isRandom && "#3b75ff"}
              onClick={() => setIsRandom(!isRandom)}
            />
            <button className="no-bg" onClick={goPrevious}>
              <BiSkipPrevious size={30} />
            </button>
            <button className="no-bg" onClick={playAudio}>
              {isplaying ? (
                <BiPause
                  size={25}
                  className="bg-blue-500 w-10 h-10 text-[white] block rounded-[50%]"
                />
              ) : (
                <AiFillPlayCircle
                  color={"#3b75ff"}
                  className="w-10 h-10 block"
                />
              )}
            </button>
            <BiSkipNext size={30} onClick={goNext} />
            <CiRedo
              size={25}
              color={isRepeat && "#3b75ff"}
              onClick={() => setIsRepeat(!isRepeat)}
            />
            <BiDotsHorizontalRounded
              className="media-control__content__control__icon__mobile-setting"
              size={25}
            />
          </div>
          {/* timeline */}
          <div className="flex items-center justify-center">
            <div className="text-[color:var(--grey)]">
              {secondToMinutes(currentSong.currentTime)}
            </div>
            <div
              className="cursor-pointer w-[300px] bg-gray-500 h-1 mx-[15px] my-0 rounded-[100px]"
              onClick={checkWidth}
              ref={clickRef}
            >
              <div
                className="bg-blue-500 w-[0%] m-0 h-1"
                style={{ width: `${currentSong.progress + "%"}` }}
              ></div>
            </div>
            <div className="text-[color:var(--grey)]">
              {currentSong.duration}
            </div>
          </div>
        </div>
        {/* setting */}
        <div className="flex items-center">
          <Link to={"/lyrics"} className="no-bg">
            <BsFileEarmarkMusic />
          </Link>
          <AiOutlineUnorderedList />
          <BsFillVolumeUpFill />
          <div
            className="cursor-pointer w-[50px] bg-[color:var(--grey)] h-[3px] mr-2.5 rounded-[100px]"
            onClick={checkAudio}
            ref={audioRef}
          >
            <div
              className="bg-[color:var(--blue)] h-[3px] rounded-[100px]"
              style={{ width: `${currentVolume * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaControlOld;
