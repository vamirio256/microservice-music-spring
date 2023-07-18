import React, { useEffect, useState } from "react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../../CSS/SwiperCSS.css";
import image from "../../images/temp_track_cover.jfif";
import TrackCard from "../../components/TrackCard";

const HorizontalTrackSwiper = ({ title }) => {
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const getPlaylist = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"))["jwtToken"];
        const url = `${process.env.REACT_APP_API_BASE_URL}/playlists/6`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const playlistData = await response.json();
        setPlaylist(playlistData);
      } catch (error) {
        console.error(
          "An error occurred while retrieving the playlist:",
          error
        );
        // Handle network or other errors
      }
    };
    getPlaylist();
  }, []);

  return (
    <>
      {playlist ? (
        <>
          <h1>Playlist: {playlist.name}</h1>

          <div className="mb-8">
            <h2 className="mb-8 font-thin text-xl">{title}</h2>
            <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={10}
              slidesPerView={4}
              navigation
              loop={true}
              // breakpoints={{
              //   768: {
              //     slidesPerView: 3,
              //     spaceBetween: 30,
              //   },
              //   1024: {
              //     slidesPerView: 4,
              //     spaceBetween: 10,
              //   },
              // }}
            >
              <ul>
                {playlist.tracks.map((track, index) => (
                  <SwiperSlide>
                    <TrackCard
                      key={index}
                      title={track.name}
                      coverUrl={track.coverUrl}
                      artist={track.user.username}
                    />
                  </SwiperSlide>
                ))}
              </ul>
            </Swiper>
            <hr className="mt-8 block h-[1px]" />
          </div>
        </>
      ) : (
        <p>Loading playlist...</p>
      )}
    </>
  );
};

export default HorizontalTrackSwiper;
