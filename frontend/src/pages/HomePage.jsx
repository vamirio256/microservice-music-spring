import TrackCard from "../components/TrackCard";

import React, { useState } from "react";
import image from "../images/temp_track_cover.jfif";

import { A11y, Navigation, Pagination, Scrollbar } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../CSS/SwiperCSS.css";
import { HorizontalCard } from "../components/HorizontalCard";
import Modal from "react-modal";
import PlaylistPopup from "../containers/PlaylistPopup";

const HomePage = () => {
  const [track, setTrack] = useState({
    image: image,
    artist: "Hello",
    title: "World",
  });

  // const url = `${process.env.REACT_APP_API_BASE_URL}/tracks/cover/1`;
  // const accessToken = localStorage.getItem("accessToken");

  // useEffect(() => {
  //   const fetchImage = async () => {
  //     try {
  //       console.log("Bearer " + accessToken);
  //       const response = await fetch(url, {
  //         method: "GET",
  //         headers: {
  //           Authorization: "Bearer " + accessToken,
  //         },
  //       });
  //       if (response.ok) {
  //         const blob = await response.blob();
  //         setTrack({ ...track, image: URL.createObjectURL(blob) });
  //       }
  //     } catch (error) {
  //       console.error("Error fetching image:", error);
  //     }
  //   };

  //   fetchImage();
  // }, []);

  // const prevButton = classNames{

  // }
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleIsPlaying = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex">
      {/* home leftside */}
      <div className="w-8/12 border-r-2 border-solid">
        <div className="grid grid-cols-5 grid-rows-2 gap-x-4 gap-y-6">
          <TrackCard track={track} openModal={openModal} />
          <TrackCard track={track} openModal={openModal} />
          <TrackCard track={track} openModal={openModal} />
          <TrackCard track={track} openModal={openModal} />
        </div>

        {/* slide */}
        <div className="mt-10">
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={4}
            navigation
            loop={true}
            autoHeight={true}
            breakpoints={{
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
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
        </div>
      </div>
      {/* sidebar */}

      <div className="w-4/12 p-5">
        {/* card item */}
        <HorizontalCard /> <HorizontalCard /> <HorizontalCard />
        <HorizontalCard /> <HorizontalCard />
      </div>
      {/* model */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
          overlay: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "999",
          },
          content: {
            inset: "0",
            position: "relative",
            width: "600px",
            height: "500px",
          },
        }}
      >
        <button onClick={closeModal} className="ml-auto mr-0 block">
          x
        </button>
        <PlaylistPopup />
      </Modal>
    </div>
  );
};

export default HomePage;
