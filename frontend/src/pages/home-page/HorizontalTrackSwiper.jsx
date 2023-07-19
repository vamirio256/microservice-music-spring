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

const HorizontalTrackSwiper = ({ title, api }) => {
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playlistData = await api();
        console.log(playlistData);
        setPlaylist(playlistData);
      } catch (error) {
        console.error("An error occurred while retrieving the playlist:", error);
      }
    };

    fetchData();
  }, [api]);

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
            >
              <ul>
                {playlist.tracks.map((track, index) => (
                  <SwiperSlide key={index}>
                    <TrackCard
                      track={track}
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
