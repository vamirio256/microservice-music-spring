import React, { useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)
gradient.addColorStop(0, '#656666') // Top color
gradient.addColorStop((canvas.height * 0.7) / canvas.height, '#656666') // Top color
gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#B1B1B1') // Bottom color
gradient.addColorStop(1, '#B1B1B1') // Bottom color

// Define the progress gradient
const progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)
progressGradient.addColorStop(0, '#EE772F') // Top color
progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, '#EB4926') // Top color
progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#F6B094') // Bottom color
progressGradient.addColorStop(1, '#F6B094') // Bottom color

const TrackInput = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const waveContainerRef = useRef(null);
  const wavesurfer = useRef(null);

  useEffect(() => {
    if (fileUrl) {
      wavesurfer.current.load(fileUrl);
    }
  }, [fileUrl]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveContainerRef.current,
      waveColor: gradient,
      progressColor: progressGradient,
      height: 80,
      responsive: true,
      interact: true,
    //   cursorColor: "transparent",
    //   cursorWidth: 0,
      barWidth: 2,
      barRadius: 3,
      normalize: true,
    //   backend: "WebAudio",
    });

    return () => {
      // Clean up the WaveSurfer instance on component unmount
      wavesurfer.current.destroy();
    };
  }, []);

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

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <div className="overflow-hidden h-[40px]">
      <div ref={waveContainerRef} className="transform h-[80px]"></div>
      </div>
      <button id="play-button" onClick={handlePlay}>
        Play
      </button>
      <button id="pause-button" onClick={handlePause}>
        Pause
      </button>
    </div>
  );
};

export default TrackInput;