import React, { useEffect, useState, useRef } from "react";
import { A11y, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../../CSS/SwiperCSS.css";
import image from "../../assets/images/temp_track_cover.jfif";
import TrackCard from "./TrackCard";
import { GrNext, GrPrevious } from "react-icons/gr";

const TrackSwiper = ({ playlist }) => {
  const swiperRef = useRef(null);

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  const button =
    "absolute  top-[40%]  w-[30px] h-[30px] flex border justify-center items-center rounded-[5px] border-solid border-[#d8d7d7] group hover:border-primary";
  return (
    <>
      {playlist ? (
        <>
          <div className="mb-8">
            <h2 className="mb-8 font-thin text-xl xl">{playlist.name}</h2>
            <div className="swiper-container relative">
              <div className="swiper-wrapper">
                <Swiper
                  ref={swiperRef}
                  modules={[Pagination, Scrollbar, A11y]}
                  spaceBetween={10}
                  slidesPerView={2}
                  lazy={true}
                  breakpoints={{
                    640: {
                      slidesPerView: 3,
                      spaceBetween: 10,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 50,
                    },
                  }}
                >
                  {playlist.tracks.map((track, index) => (
                    <SwiperSlide key={index}>
                      <TrackCard track={track} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <button onClick={goPrev} className={`left-[-30px] ${button}`}>
                <GrPrevious size={15} className="group-hover:text-primary" />
              </button>
              <button onClick={goNext} className={`right-[-30px] ${button}`}>
                <GrNext size={15} />
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>Loading playlist...</p>
      )}
    </>
  );
};

export default TrackSwiper;
