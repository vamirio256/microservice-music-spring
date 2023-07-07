import Button from "../components/Button";
import TrackCard from "../components/TrackCard";
import trackCover from "../images/temp_track_cover.jfif";
import landingWeb from "../images/cover_landing_web.jpg";
import Login from "../containers/Login";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [track, setTrack] = useState({
    image: "",
    artist: "Hello",
    title: "World",
  });

  const url = `${process.env.REACT_APP_API_BASE_URL}/tracks/cover/1`;
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    // const fetchImage = async () => {
    //   try {
    //     console.log("Bearer " + accessToken);
    //     const response = await fetch(url, {
    //       method: "GET",
    //       headers: {
    //         Authorization: "Bearer " + accessToken,
    //       },
    //     });
    //     if (response.ok) {
    //       const blob = await response.blob();
    //       setTrack({ ...track, image: URL.createObjectURL(blob) });
    //     }
    //   } catch (error) {
    //     console.error("Error fetching image:", error);
    //   }
    // };
    // fetchImage();
  }, []);

  return (
    <div className="">
      <div className="grid grid-cols-5 grid-rows-2 gap-x-4 gap-y-6">
        {/* <TrackCard track={track} />
        <TrackCard track={track} />
        <TrackCard track={track} />
        <TrackCard track={track} />
        <TrackCard track={track} />
        <TrackCard track={track} /> */}
      </div>
    </div>
  );
};

export default HomePage;
