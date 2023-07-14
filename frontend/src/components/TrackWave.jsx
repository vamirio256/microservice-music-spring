import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import useWavesurfer from "../hooks/useWavesurfer";

const TrackWave = () => {
  const dispatch = useDispatch();
  const waveContainerRef = useRef(null);
  const { handlePlayPause, isPlaying, setAudioVolume, audioVolume } =
    useWavesurfer(waveContainerRef, audioSrc, () => dispatch(playNextSong()));
  return (
    <>
      <div className={audioSrc ? "player" : "player disable"}>
        <img src={album?.cover_medium} alt="" />

        <div className="song-details">
          <span className="song-title overflowing-text">{title}</span>
          <span className="artist-name">{artist?.name}</span>
        </div>

        <div className="control-buttons">
          <button onClick={() => dispatch(playPreviousSong())}>
            <MdSkipPrevious />
          </button>

          <button
            className="play-pause-btn"
            onClick={audioSrc && handlePlayPause}
          >
            {isPlaying ? <MdPause /> : <MdPlayArrow />}
          </button>

          <button onClick={() => dispatch(playNextSong())}>
            <MdSkipNext />
          </button>
        </div>

        <div className="wave-container" ref={waveContainerRef}></div>

        <span className="duration">{formattedDuration}</span>

        <div className="volume-slider-container">
          <button
            onClick={() =>
              setAudioVolume((prev) => ({
                ...prev,
                isMuted: prev.value <= 0 ? true : !prev.isMuted,
              }))
            }
          >
            {audioVolume.isMuted ? <MdVolumeMute /> : <MdVolumeUp />}
          </button>

          {audioSrc && (
            <VolumeSlider
              audioVolume={audioVolume}
              onChange={([value]) => {
                setAudioVolume({ isMuted: value <= 0 ? true : false, value });
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TrackWave;
