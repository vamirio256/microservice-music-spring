import React, { useState } from "react";
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


const HorizontalTrackSwiper = ({title}) => {
  const [track, setTrack] = useState({
    image: image,
    artist: "Related tracks",
    title: "SSK - Nhat Ky Ngoai Tu",
    imageUrl: `${process.env.REACT_APP_AWS_BASE_URL}/track-covers/c3fe3519-cd7c-45f5-9152-8717e37dece6`
  });

  return (
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
        <SwiperSlide>
          <TrackCard track={track} />
        </SwiperSlide>
        <SwiperSlide>
          <TrackCard track={track} />
        </SwiperSlide>
        <SwiperSlide>
          <TrackCard track={track} />
        </SwiperSlide>
        <SwiperSlide>
          <TrackCard track={track} />
        </SwiperSlide>
        <SwiperSlide>
          <TrackCard track={track} />
        </SwiperSlide>

      </Swiper>
      <hr className="mt-8 block h-[1px]" />
    </div>
  );
};

export default HorizontalTrackSwiper;
