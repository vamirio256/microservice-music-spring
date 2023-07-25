import React, { useMemo } from "react";
import { BiLogoSoundcloud } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import TopBarItem from "./TopBarItem";
import SearchBar from "./SearchBar";
import { IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../../components/modals/ConfirmModal";

const TopBar = () => {
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const openConfirmModal = () => {
    dispatch({
      type: "OPEN_MODAL_CONFIRM",
    });
  };

  return (
    <div className="sticky flex w-full justify-center items-center bg-[#333] text-sm top-0 z-10">
      <ConfirmModal context={"Do you really want to logout?"}>
        <button onClick={logout}>Yes</button>
      </ConfirmModal>

      <div className="w-[1240px]">
        <div
          className={`container bg-red h-12 flex m-auto items-center justify-between  `}
        >
          <TopBarItem
            icon={<BiLogoSoundcloud color="white" size={50} />}
            label={"Home"}
            to={"/home"}
          />
          <button
            onClick={() => {
              dispatch({ type: "SHOW_NOTIFICATION" });
            }}
          >
            <TopBarItem label={"Feed"} />
          </button>
          <button
            onClick={() => {
              dispatch({ type: "SHOW_NOTIFICATION" });
            }}
          >
            <TopBarItem label={"Library"} />
          </button>
          {/* search */}
          <SearchBar />
          {/* premium button */}
          <button
            onClick={() => {
              dispatch({ type: "SHOW_NOTIFICATION" });
            }}
          >
            <TopBarItem label={<span className="text-[#f50]">Premium</span>} />
          </button>
          <TopBarItem label={"Upload"} to={"/upload"} />
          <TopBarItem
            label={user.username}
            to={`/user/${user.id}`}
            icon={
              <img
                src={user.avatarUrl}
                className="rounded-full w-[40px] h-[40px]"
              />
            }
          />

          <button onClick={openConfirmModal}>
            <IoLogOut color="white" size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
