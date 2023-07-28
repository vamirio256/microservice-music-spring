import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { formatDuration } from "../utils/formatDuration";
import { useDispatch, useSelector } from "react-redux";

const Waveform = ({ className, audioUrl }) => {
  const waveContainerRef = useRef(null);
  const wavesurfer = useRef(null);
  const canvasRef = useRef(null);
  const durationRef = useRef(null);
  const timeRef = useRef(null);
  const currentProgress = useSelector((state) => state.progressReducer);
  const currentSong = useSelector((state) => state.currentSongReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.on("ready", () => {
        if (durationRef.current) {
          durationRef.current.textContent = formatDuration(
            wavesurfer.current.getDuration().toFixed(0)
          );
        }
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
    gradient.addColorStop(0, "#656666"); // Top color
    gradient.addColorStop((canvas.height * 0.7) / canvas.height, "#656666"); // Top color
    gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, "#ffffff"); // White line
    gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, "#ffffff"); // White line
    gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, "#B1B1B1"); // Bottom color
    gradient.addColorStop(1, "#B1B1B1"); // Bottom color

    const progressGradient = ctx.createLinearGradient(
      0,
      0,
      0,
      canvas.height * 1.35
    );
    progressGradient.addColorStop(0, "#EE772F"); // Top color
    progressGradient.addColorStop(
      (canvas.height * 0.7) / canvas.height,
      "#EB4926"
    ); // Top color
    progressGradient.addColorStop(
      (canvas.height * 0.7 + 1) / canvas.height,
      "#ffffff"
    ); // White line
    progressGradient.addColorStop(
      (canvas.height * 0.7 + 2) / canvas.height,
      "#ffffff"
    ); // White line
    progressGradient.addColorStop(
      (canvas.height * 0.7 + 3) / canvas.height,
      "#F6B094"
    ); // Bottom color
    progressGradient.addColorStop(1, "#F6B094"); // Bottom color

    wavesurfer.current = WaveSurfer.create({
      container: waveContainerRef.current,
      responsive: true,
      waveColor: gradient,
      progressColor: progressGradient,
      height: 80,
      interact: true,
      cursorColor: "#000",
      barWidth: 3,
      barRadius: 3,
      barGap: 0.75,
      normalize: true,
    });

    // wavesurfer.current.on("ready", () => {
    //   // Start the AudioContext after a user gesture
    //   wavesurfer.current.backend.ac.resume();
    // });

    wavesurfer.current.load(audioUrl);
    wavesurfer.current.on("click", () => {
      // Handle logic for the 'ontimeupdate' equivalent here
      // For example, update the current time or progress bar

      const currentTime = wavesurfer.current.getCurrentTime();
      dispatch({
        type: "MODIFYPROGRESS",
        progress: currentTime,
      });
    });

    wavesurfer.current.on("ready", () => {
      console.log("ready");

      const buffer = wavesurfer.current.getDecodedData();
      // console.log(buffer);

      let channel0Peaks = buffer.getChannelData(0);
      console.log("channel0Peaks : ", channel0Peaks);

      let channel1Peaks = buffer.getChannelData(1);
      console.log("channel1Peaks : ", channel1Peaks);

      console.log("buffer length : ", buffer.length);
      console.log("buffer duration : ", buffer.duration);
      console.log("buffer sampleRate : ", buffer.sampleRate);
      console.log("buffer numberOfChannels : ", buffer.numberOfChannels);
    });
    return () => {
      // Clean up the WaveSurfer instance on component unmount
      wavesurfer.current.destroy();
    };
  }, [audioUrl]);

  // set progress
  useEffect(() => {
    if (!audioUrl || !currentSong || audioUrl !== currentSong.audioUrl) {
      return;
    }
    if (currentProgress) {
      wavesurfer.current.setTime(
        (currentProgress * wavesurfer.current.duration) / 100
      );
    } else {
      wavesurfer.current.setTime(0);
    }
    if (timeRef.current) {
      timeRef.current.textContent = formatDuration(
        wavesurfer.current.getCurrentTime().toFixed(0)
      );
    }
  }, [currentProgress]);
  const timeStyle =
    "absolute z-10 top-1/4 text-xs bg-[rgba(0, 0, 0, 0.75)] p-0.5 text-[#ddd] bg-black text-[8px]";

  return (
    <div className={`overflow-hidden h-[50px] relative w-full ${className} `}>
      <div
        ref={waveContainerRef}
        className="cursor-pointer relative transform h-[100px]"
      />
      <canvas ref={canvasRef} />
      <div ref={timeRef} className={`${timeStyle} left-0 text-[#f50]`}>
        0:00
      </div>
      <div
        ref={durationRef}
        className={`${timeStyle} right-0`}
        onClick={() => wavesurfer.current.play()}
      >
        0:00
      </div>
    </div>
  );
};

export default Waveform;
