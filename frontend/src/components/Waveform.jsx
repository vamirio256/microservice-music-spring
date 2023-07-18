import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
gradient.addColorStop(0, "#656666"); // Top color
gradient.addColorStop((canvas.height * 0.7) / canvas.height, "#656666"); // Top color
gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, "#ffffff"); // White line
gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, "#ffffff"); // White line
gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, "#B1B1B1"); // Bottom color
gradient.addColorStop(1, "#B1B1B1"); // Bottom color

// Define the progress gradient
const progressGradient = ctx.createLinearGradient(
  0,
  0,
  0,
  canvas.height * 1.35
);
progressGradient.addColorStop(0, "#EE772F"); // Top color
progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, "#EB4926"); // Top color
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

const Waveform = ({ audioUrl }) => {
  const [fileUrl, setFileUrl] = useState(null);
  const waveContainerRef = useRef(null);
  const wavesurfer = useRef(null);
  const timeRef = useRef(0);
  const durationRef = useRef(0);

  useEffect(() => {
    if (fileUrl) {
      wavesurfer.current.load(URL.createObjectURL(audioUrl));
    }
  }, [fileUrl]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileUrl(URL.createObjectURL(file));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${minutes}:${paddedSeconds}`;
  };

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveContainerRef.current,
      waveColor: gradient,
      progressColor: progressGradient,
      height: 80,
      interact: true,
      //   cursorColor: "transparent",
      //   cursorWidth: 0,
      barWidth: 4,
      barRadius: 3,
      barGap: 0.75,
      normalize: true,
      //   backend: "WebAudio",
    });

    wavesurfer.current.load(audioUrl);

    return () => {
      // Clean up the WaveSurfer instance on component unmount
      wavesurfer.current.destroy();
    };
  }, [audioUrl]);

  const handlePlay = () => {
    if (wavesurfer.current) {
      wavesurfer.current.play();
    }
  };

  const handlePause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.pause();
    }
  };

  const timeStyle =
    "absolute z-10 top-1/4 text-xs bg-[rgba(0, 0, 0, 0.75)] p-0.5 text-[#ddd] bg-black text-[10px]";

  return (
    <div className="overflow-hidden h-[40px]">
      <div ref={waveContainerRef} className="cursor-pointer relative transform h-[80px]">
        <div ref={timeRef} className={`${timeStyle} left-0 text-[#f50]`}>
          0:00
        </div>
        <div ref={durationRef} className={`${timeStyle} right-0`}>
          0:00
        </div>
      </div>
    </div>
  );
};

export default Waveform;
