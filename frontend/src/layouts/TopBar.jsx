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

  const routes = useMemo(() => [
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
      label: "Library",
      active: pathname === "/library",
      href: "/library",
    },
  ]);

  return (
    <>
      <div className="flex w-full justify-content bg-[#333]">
        <div className={`container bg-red h-12 flex m-auto items-center`}>
          {routes.map((ele, index) => {
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
    </>
  );
};

export default TopBar;
