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
import Footer from "../footer/Footer";
import loading from "../../assets/images/loading-gif.gif";

const SideBar = ({ recommendSection }) => {
  const historySongs = useSelector((state) => state.historyReducer);
  const [recommendUser, setRecommendUser] = useState("");

  const getRecommendUser = async () => {
    setRecommendUser("");
    setRecommendUser(await getRecommentUser());
  };

  useEffect(() => {
    getRecommendUser();
  }, []);

  return (
    <div>
      {/* recommend user */}
      {recommendSection && (
        <SideBarSection
          icon={<BsFillPeopleFill />}
          sideButton={
            <button className="text-xs" onClick={getRecommendUser}>
              Refresh List
            </button>
          }
          header={"People you should know"}
        >
          {recommendUser.length === 0 ? (
            <img src={loading} alt="Loading" className="left-0 right-0 m-auto w-[40px]"/>
          ) : (
            recommendUser.map((item, index) => (
              <SideBarUserCard key={index} user={item} className={"mb-2"} />
            ))
          )}
        </SideBarSection>
      )}

      {/* track history */}
      {historySongs.length == 0 ? (
        <></>
      ) : (
        <SideBarSection
          icon={<BsFillCalendarEventFill />}
          sideButton={
            <Link to="/library/history" className="text-xs">
              View all
            </Link>
          }
          header={"Listening history"}
        >
          {historySongs.slice(0, 3).map((item, index) => {
            return <SideBarTrackCard key={index} track={item} />;
          })}
        </SideBarSection>
      )}

      {/* mobile*/}
      <SideBarSection header={"Go mobile"} icon={<BiSolidMobile />}>
        <div className="grid grid-cols-2 gap-5 items-center">
          <img
            src={apple_store}
            className="max-w-[150px] h-[47px] cursor-pointer"
          />
          <img
            src={google_play}
            className="max-w-[150px] h-[50px] cursor-pointer"
          />
        </div>
      </SideBarSection>

      {/* sidebar section */}
      <SideBarSection>
        <Footer />
      </SideBarSection>
    </div>
  );
};

export default SideBar;
