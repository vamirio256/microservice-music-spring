import React, { useEffect, useState } from "react";
import apple_store from "../../assets/images/apple_store.png";
import google_play from "../../assets/images/google_play.png";
import { SideBarTrackCard } from "./SideBarTrackCard";
import { useSelector } from "react-redux";
import SideBarSection from "./SideBarSection";
import { BiSolidMobile } from "react-icons/bi";
import { getRecommentUser } from "../../apis/user/getRecommendUser";
import SideBarUserCard from "./SideBarUserCard";
import { BsFillCalendarEventFill, BsFillPeopleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const SideBar = () => {
  const historySongs = useSelector((state) => state.historyReducer);
  const [recommendUser, setRecommendUser] = useState("");

  useEffect(() => {
    const getRecommendUserOnInital = async () => {
      setRecommendUser(await getRecommentUser());
    };

    getRecommendUserOnInital();
  }, []);

  return (
    <div>
      {/* track history */}
      {recommendUser.length == 0 ? (
        <></>
      ) : (
        <SideBarSection
          icon={<BsFillPeopleFill />}
          sideButton={"Refresh list"}
          header={"People you should know"}
        >
          {recommendUser.map((item, index) => {
            return (
              <SideBarUserCard key={index} user={item} className={"mb-2"} />
            );
          })}
        </SideBarSection>
      )}

      {/* track history */}
      {historySongs.length == 0 ? (
        <></>
      ) : (
        <SideBarSection
          icon={<BsFillCalendarEventFill />}
          sideButton={<Link to="/library/history">View all</Link>}
          header={"Listening history"}
        >
          {historySongs.slice(0, 3).map((item, index) => {
            return <SideBarTrackCard key={index} track={item} />;
          })}
        </SideBarSection>
      )}

      {/* mobile*/}
      <SideBarSection header={"Go mobile"} icon={<BiSolidMobile />}>
        <div className="flex justify-center">
          <a className="cursor-pointer">
            <img src={apple_store} className="max-w-[150px] mr-2" />
          </a>
          <a className="cursor-pointer">
            <img src={google_play} className="max-w-[150px]" />
          </a>
        </div>
      </SideBarSection>

      {/* sidebar section */}
      <SideBarSection>
        <div className="text-[13px] font-normal">
          <div>
            <a className="cursor-pointer text-gray-300 hover:text-gray-500 mr-2">
              Legal
            </a>
            <a className="cursor-pointer text-gray-300 hover:text-gray-500 mr-2">
              Privacy
            </a>
            <a className="cursor-pointer text-gray-300 hover:text-gray-500 mr-2">
              Cookie Policy
            </a>
            <a className="cursor-pointer text-gray-300 hover:text-gray-500 mr-2">
              Imprint
            </a>
            <a className="cursor-pointer text-gray-300 hover:text-gray-500 mr-2">
              Consent Manager
            </a>
            <a className="cursor-pointer text-gray-300 hover:text-gray-500 mr-2">
              Blog
            </a>
            <a className="cursor-pointer text-gray-300 hover:text-gray-500 mr-2">
              Charts
            </a>
          </div>
          <a className="hover:bg-gray-100 cursor-pointer">
            <span className="text-blue-500">Language:</span> English (US)
          </a>
        </div>
      </SideBarSection>
    </div>
  );
};

export default SideBar;
