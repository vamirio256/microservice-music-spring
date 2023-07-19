import React, { useState } from "react";
import { AiOutlineHistory } from "react-icons/ai";
import { BiSolidMobile } from "react-icons/bi";
import Modal from "react-modal";
import PlaylistPopup from "../../components/modal/PlaylistPopup";
import apple_store from "../..//images/apple_store.png";
import google_play from "../../images/google_play.png";
import HomePageTrackHorizontalSwipe from "./HorizontalTrackSwiper";
import { SideBarTrackCard } from "./SideBarTrackCard";
import Playlist from "../../components/playlist/Playlist";
import { useSelector } from "react-redux";

const HomePage = () => {
  const historySongs = useSelector((state) => state.songHistoryReducer);
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
        <Playlist title={"Recently Played"} />
      </div>
      {/* sidebar */}
      <div className="w-[28%] pl-8 pt-8 text-[#999] text-[14px]">
        {/* sidebar section */}
        {historySongs.length == 0 ? (
          <></>
        ) : (
          <SideBarSection
            icon={<AiOutlineHistory />}
            header={"Listening history"}
          >
            {historySongs.map((item, index) => {
              return <SideBarTrackCard key={index} data={item} />;
            })}
          </SideBarSection>
        )}

        {/* sidebar section */}
        <SideBarSection header={"Go mobile"} icon={<BiSolidMobile />}>
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
        <div className="flex flex-row items-center">
          <span>{icon}</span>
          <span >{header}</span>
        </div>
        <hr className="" />
      </div>
      {children}
    </div>
  );
};
export default HomePage;
