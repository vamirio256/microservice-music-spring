import React, { useState } from "react";
import { AiOutlineHistory } from "react-icons/ai";
import { BiSolidMobile } from "react-icons/bi";
import Modal from "react-modal";
import PlaylistPopup from "../../components/modal/PlaylistPopup";
import apple_store from "../..//images/apple_store.png";
import google_play from "../../images/google_play.png";
import HomePageTrackHorizontalSwipe from "./HorizontalTrackSwiper";
import {
  SideBarTrackCard,
} from "./SideBarTrackCard";
import TrackInput from "../../components/TrackInput";

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
      <div className="w-[72%] border-r-[1px] border-solid pt-8 pr-8">
        <HomePageTrackHorizontalSwipe title="More of what you like" />
        <HomePageTrackHorizontalSwipe title="More of what you like" />
        <TrackInput />
      </div>
      {/* sidebar */}
      <div className="w-[28%] pl-8 pt-8 text-[#999] text-[14px]">
        {/* sidebar section */}
        <SideBarSection icon={<AiOutlineHistory />} header={"Listening history"}>
          <SideBarTrackCard />
          <SideBarTrackCard />
          <SideBarTrackCard />
          <SideBarTrackCard />
        </SideBarSection>

        {/* sidebar section */}
        <SideBarSection header={"Go mobile"} icon={<BiSolidMobile/>}>
          <div className="grid grid-cols-2 gap-1">
            <a className="cursor-pointer">
              <img src={apple_store} />
            </a>
            <a className="cursor-pointer">
              <img src={google_play} />
            </a>
          </div>
        </SideBarSection>

        {/* sidebar section */}
        <SideBarSection>
          <div className="text-xs">
            <p>
              Legal ⁃ Privacy ⁃ Cookie Policy ⁃ Consent Manager ⁃ Imprint ⁃
              Artist Resources ⁃ Blog ⁃ Charts ⁃
            </p>
            <p>
              <span>Language:</span> English (US)
            </p>
          </div>
        </SideBarSection>
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

const SideBarSection = ({ header, icon, children }) => {
  return (
    <div>
      <div>
        <div className="flex flex-row">
          <span>{icon}</span>
          <p>{header}</p>
        </div>
        <hr className="" />
      </div>
      {children}
    </div>
  );
};
export default HomePage;
