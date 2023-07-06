import React, { useEffect, useState } from "react";

const PlayControl = ({ children }) => {
  const [audioUrl, setAudioUrl] = useState("");

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/tracks/audio/1`;
    const accessToken = localStorage.getItem("accessToken");
    const fetchAudio = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });

        if (response.ok) {
          const audioData = await response.arrayBuffer();
          const blob = new Blob([audioData], { type: "audio/mpeg" });
          setAudioUrl(URL.createObjectURL(blob));
        }
      } catch (err) {
        console.error("Can not fetching audio: ", err);
      }
    };
    fetchAudio();
  }, []);

  return (
    <div>
      <audio controls>
        <source src={audioUrl} type="audio/mpeg" />
        {children}
      </audio>
    </div>
  );
};

export default PlayControl;
