import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "./CustomModal";
import loadingimage from "../../assets/images/loading-gif.gif";
import { createPlaylist } from "../../apis/playlist/createPlaylist";
import { RxCross1 } from "react-icons/rx";

const PlaylistModal = () => {
  const { modalIsOpen, track } = useSelector((state) => ({
    modalIsOpen: state.modalReducer.playlist.isShowed,
    track: state.modalReducer.playlist.track,
  }));
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [active_tab, set_active_tab] = useState("create_a_playlist");
  const active_style = "text-primary border-b-2 border-b-primary border-solid";
  const hover = "hover:border-b-2 hover:border-b-black hover:border-solid";
  const [loading, setLoading] = useState(false);

  const playlistList = useSelector(
    (state) => state.userReducer.profile.playlists
  );
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL_PLAYLIST" });
  };

  async function uploadPlaylist() {
    setLoading(true);
    const formData = new FormData();

    formData.append(
      "playlist",
      new Blob([JSON.stringify({ name: title, isPublic: "true" })], {
        type: "application/json",
      })
    );
    formData.append(
      "track",
      new Blob([JSON.stringify(track)], {
        type: "application/json",
      })
    );

    const response = await createPlaylist(formData);
    console.log(response);
    setLoading(false);
    closeModal();
  }

  const addTrackToPlaylist = async () => {
    return;
  };

  return (
    <>
      {track && (
        <CustomModal modalIsOpen={modalIsOpen} closeModel={closeModal}>
          <div className="container block m-auto">
            {/* close button */}
            <button onClick={closeModal} className="ml-auto mr-0 block">
              <RxCross1 />
            </button>
            {/* Top bar */}
            <div className="mt-2 text-lg">
              <button
                className={`${
                  active_tab === "add_to_playlist" ? active_style : hover
                } mr-9`}
                onClick={() => set_active_tab("add_to_playlist")}
              >
                Add to Playlist
              </button>
              <button
                className={`${
                  active_tab === "create_a_playlist" ? active_style : hover
                }`}
                onClick={() => set_active_tab("create_a_playlist")}
              >
                Create a playlist
              </button>
            </div>

            {/* add to playlist */}
            <div
              className={active_tab === "add_to_playlist" ? "block" : "hidden"}
            >
              <div className="mt-5">
                {playlistList.map((item, index) => {
                  return <PlaylistPopupItem key={index} playlist={item} />;
                })}
              </div>
            </div>

            {/* create playlist */}
            <div
              className={
                active_tab === "create_a_playlist" ? "block" : "hidden"
              }
            >
              <div className="pt-5 w-full">
                {/* title playlist */}
                <div>
                  Title <span className="text-red-500">*</span>
                </div>
                <input
                  type="text"
                  required
                  className="outline-1 outline-gray-400 outline rounded-sm w-full px-2 h-[30px]"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="pt-3">
                  <span className="pr-4">Privacy:</span>
                  <input type="radio" name="privacy" value="public" />
                  <label className="pl-1 pr-1" htmlFor="privacy">
                    Public
                  </label>
                  <input type="radio" name="privacy" value="private" />
                  <label className="pl-1" htmlFor="privacy">
                    Private
                  </label>

                  <button
                    className="primary-button block ml-auto"
                    onClick={uploadPlaylist}
                  >
                    {" "}
                    {loading ? (
                      <img src={loadingimage} alt="" width={15} height={15} />
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CustomModal>
      )}
    </>
  );
};

const PlaylistPopupItem = ({ playlist }) => {
  const trackId = useSelector((state) => state.modalReducer.playlist.track.id);
  async function addToPlaylist() {
    try {
      const token = "Bearer " + localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/playlists/${playlist.id}/add-track/${trackId}`,
        {
          method: "POST",
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        alert("Add track to playlist successfully.");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      alert("Error occurred while uploading");
    }
  }
  return (
    <div className="mb-2 flex text-sm items-center">
      <img src={playlist.coverUrl} alt="" className="w-5 h-5" />

      {/* titile */}
      <div className="text-gray-500 pl-5">{playlist.name}</div>
      {/* button add to playlist*/}

      <div className="ml-auto flex">
        <button className="outline-button" onClick={addToPlaylist}>
          Add to Playlist
        </button>
      </div>
    </div>
  );
};

export default PlaylistModal;
