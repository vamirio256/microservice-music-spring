import React, { useEffect, useState } from "react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../../CSS/SwiperCSS.css";
import image from "../../assets/images/temp_track_cover.jfif";
import TrackCard from "./TrackCard";

const TrackSwiper = ({ playlist }) => {
  return (
    <>
      {playlist ? (
        <>
          <div className="mb-8">
            <h2 className="mb-8 font-thin text-xl xl">{playlist.name}</h2>
            <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={10}
              slidesPerView={2}
              navigation
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },

                1024: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
            >
              <ul>
                {playlist.tracks.map((track, index) => (
                  <SwiperSlide key={index}>
                    <TrackCard track={track} />
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

export default TrackSwiper;
