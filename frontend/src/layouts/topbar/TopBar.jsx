import React, { useMemo } from "react";
import { BiLogoSoundcloud, BiMenuAltLeft } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import TopBarItem from "./TopBarItem";
import SearchBar from "./SearchBar";
import { IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../../components/modals/ConfirmModal";
import NotificationDropDown from "../../components/drop-downs/NotificationDropDown";

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

  const closeConfirmModal = () => {
    dispatch({
      type: "CLOSE_MODAL_CONFIRM",
    });
  };

  return (
    <div className="sticky flex w-full justify-center items-center bg-[#333] text-sm top-0 z-10">
      <ConfirmModal context={"Do you really want to logout?"}>
        <div className="flex flex-row justify-center mt-4">
          <button
            onClick={logout}
            className="bg-[#f50] px-2 py-1 rounded-md border border-solid"
          >
            Yes
          </button>
          <button
            onClick={closeConfirmModal}
            className="px-2 py-1 rounded-md border border-solid"
          >
            Cancel
          </button>
        </div>
      </ConfirmModal>

      <div className="w-[1240px]">
        <div
          className={`container bg-red h-12 flex m-auto items-center justify-between  `}
        >
          <BiMenuAltLeft size={40} color="white" />

          {/* topbar item menu */}
          <div className="container h-12 flex m-auto items-center justify-between flex-col bg-topbar w-[300px] absolute left-0 top-0 lg:flex-row lg:w-full">
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
            <TopBarItem label={"Library"} to={"/library"} />
            {/* search */}
            <SearchBar />
            {/* premium button */}
            <button
              onClick={() => {
                dispatch({ type: "SHOW_NOTIFICATION" });
              }}
            >
              <TopBarItem
                label={<span className="text-[#f50]">Premium</span>}
              />
            </button>
            <TopBarItem label={"Upload"} to={"/upload"} />
          </div>
          {/* account infor */}
          <div className="relative">
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
            <div className="absolute bottom-[-70px] right-[20px] bg-white shadow-md p-2">
              <div>Account</div>
              <hr className="my-1" />
              <div> Logout</div>
            </div>
          </div>
          {/* notification button
          <NotificationDropDown /> */}
          <button onClick={openConfirmModal}>
            <IoLogOut color="white" size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
