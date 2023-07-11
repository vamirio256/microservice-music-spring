import TrackCard from "../components/TrackCard";
import React, { useState } from "react";
import image from "../images/temp_track_cover.jfif";
import { HomePageSideTrackCard, HorizontalCard } from "../components/HomePageSideTrackCard";
import Modal from "react-modal";
import PlaylistPopup from "../containers/PlaylistPopup";
import TrackHorizontalSwipe from "../components/HomePageTrackHorizontalSwipe";
import HomePageTrackHorizontalSwipe from "../components/HomePageTrackHorizontalSwipe";
import apple_store from "../images/apple_store.png";
import google_play from "../images/google_play.png";


const HomePage = () => {
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
    <div className="flex pl-8 pr-8">
      {/* home leftside */}
      <div className="w-8/12 border-r-[1px] border-solid pt-8 pr-8">
        <HomePageTrackHorizontalSwipe />
        <HomePageTrackHorizontalSwipe />
        <HomePageTrackHorizontalSwipe />
        <HomePageTrackHorizontalSwipe />
      </div>

      {/* sidebar */}
      <div className="w-4/12 pl-8 pt-8 text-[#999] text-[14px]">
        <div>
          <hr className="" />
        </div>
        {/* card item */}
        <HomePageSideTrackCard />
        <HomePageSideTrackCard /> 
        <HomePageSideTrackCard /> 
        <HomePageSideTrackCard /> 

        <div className="grid grid-cols-2 gap-1">
          <a className="cursor-pointer">
          <img src = {apple_store}/>
          </a>
          <a className="cursor-pointer">
          <img src = {google_play}/>
          </a>l
        </div>

        <div className="text-xs">
          <p>
            Legal ⁃ Privacy ⁃ Cookie Policy ⁃ Consent Manager ⁃ Imprint ⁃ Artist
            Resources ⁃ Blog ⁃ Charts ⁃
          </p>
          <p>
            <span>Language:</span> English (US)
          </p>
        </div>
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
