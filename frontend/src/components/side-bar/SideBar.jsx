import React from "react";
import apple_store from "../../assets/images/apple_store.png";
import google_play from "../../assets/images/google_play.png";
import { SideBarTrackCard } from "./SideBarTrackCard";
import { useSelector } from "react-redux";
import SideBarSection from "./SideBarSection";
import { AiOutlineHistory } from "react-icons/ai";
import { BiSolidMobile } from "react-icons/bi";

const SideBar = () => {
  const historySongs = useSelector((state) => state.songHistoryReducer);

  return (
    <div>
      {/* sidebar section */}
      {historySongs.length == 0 ? (
        <></>
      ) : (
        <SideBarSection
          icon={<AiOutlineHistory />}
          header={"Listening history"}
        >
          {historySongs.map((item, index) => {
            return <SideBarTrackCard key={index} track={item} />;
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
            Legal ⁃ Privacy ⁃ Cookie Policy ⁃ Consent Manager ⁃ Imprint ⁃ Artist
            Resources ⁃ Blog ⁃ Charts ⁃
          </p>
          <p>
            <span>Language:</span> English (US)
          </p>
        </div>
      </SideBarSection>
    </div>
  );
};

export default SideBar;
