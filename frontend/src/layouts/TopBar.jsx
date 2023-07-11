import React, { useMemo } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiLogoSoundcloud } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import TopBarItem from "../components/TopBarItem";
// test
import Modal from "react-modal";
import Login from "../containers/Login";
const TopBar = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const pathname = useLocation().pathname;

  const leftRoutes = useMemo(() => [
    {
      icon: BiLogoSoundcloud,
      active: pathname === "/",
      href: "/",
    },
    {
      label: "Home",
      active: pathname === "/",
      href: "/",
    },
    {
      label: "Feed",
      active: pathname === "/feed",
      href: "/feed",
    },
    {
      label: "Library",
      active: pathname === "/library",
      href: "/library",
    },
  ]);

  const rightRoutes = useMemo(() => [
    {
      label: "For Artists",
      active: pathname === "/artist",
      href: "/artist",
    },
    {
      label: "Upload",
      active: pathname === "/upload",
      href: "/upload",
    },
  ]);

  return (
    <div className="flex w-full justify-center items-center bg-[#333] text-sm">
      <div className="w-[1240px]">
        <div className={`container bg-red h-12 flex m-auto items-center`}>
          {leftRoutes.map((ele, index) => {
            return (
              <TopBarItem
                key={index}
                label={ele.label}
                icon={ele.icon}
                href={ele.href}
                active={ele.active}
              />
            );
          })}
          {/* search */}
          <input
            type="text"
            placeholder="Search"
            className="px-2 py-1 w-96 ml-5 h-8 rounded-md focus:outline-none"
          />
          <AiOutlineSearch
            className="right-6 relative"
            color="gray"
            size={20}
          />
          {rightRoutes.map((ele, index) => {
            return (
              <TopBarItem
                key={index}
                label={ele.label}
                icon={ele.icon}
                href={ele.href}
                active={ele.active}
              />
            );
          })}
          {/* login */}
          <button
            className="text-white rounded-sm border-solid border-[0.5px] border-slate-200 p-1 border-w ml-auto bg-primary"
            onClick={openModal}
          >
            Sign in
          </button>

          {/* login modal */}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            style={{
              overlay: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
              content: {
                inset: "0",
                position: "relative",
                width: "450px",
                height: "500px",
              },
            }}
          >
            <button onClick={closeModal} className="ml-auto mr-0 block">
              x
            </button>
            <Login />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
