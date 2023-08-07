import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import CustomModal from "./CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../apis/auth/login";
import { getUserData } from "../../apis/user/getUserData";
import { RxCross1 } from "react-icons/rx";
import { googleLogin } from "../../apis/auth/googleLogin";
import { FcGoogle } from "react-icons/fc";

import ImageCrop from "../image/ImageCrop";

import loadingimage from "../../assets/images/loading-gif.gif";
import { BiEdit } from "react-icons/bi";
import EditPlaylistTrackCard from "../playlist/EditPlaylistTrackCard";
const EditPlaylistModal = () => {
  // playlist riêng để xóa bài hát trong playlist
  const [playlist, setPlaylist] = useState();

  const [permalink, setPermalink] = useState("test");

  const [fileImageCrop, setFileImageCrop] = useState();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const permalinkRef = useRef();
  const [tab, setTab] = useState("basicInfo");

  const editPlaylist = useSelector(
    (state) => state.modalReducer.editPlaylist.isShowed
  );
  //playlist redux
  const currentEditPlaylist = useSelector(
    (state) => state.modalReducer.editPlaylist.playlist
  );
  useEffect(() => {
    setPlaylist(currentEditPlaylist);
  }, [currentEditPlaylist]);
  function closeModal() {
    dispatch({ type: "CLOSE_MODAL_EDIT_PLAYLIST" });
    setPlaylist(currentEditPlaylist);
  }
  function removeTrackFromPlaylist(track) {
    let arr = playlist.tracks.filter((item) => item !== track);
    setPlaylist({ ...playlist, tracks: arr });
  }
  function save() {}
  const active_style = "text-primary border-b-2 border-b-primary border-solid";
  const hover = "hover:border-b-2 hover:border-b-black hover:border-solid";
  return (
    playlist && (
      <CustomModal modalIsOpen={editPlaylist} closeModel={closeModal}>
        {/* Top bar */}
        <div className="mt-2 text-lg">
          <button
            className={`${tab === "basicInfo" ? active_style : hover} mr-9`}
            onClick={() => setTab("basicInfo")}
          >
            Basic info
          </button>
          <button
            className={`${tab === "tracks" ? active_style : hover}`}
            onClick={() => setTab("tracks")}
          >
            Tracks
          </button>
        </div>
        {tab == "basicInfo" ? (
          <div
            className={`w-full mt-5 p-5 lg:p-10 flex-col lg:flex-row flex lg:w-[1000px] `}
          >
            {/* image */}
            <div className="w-full lg:w-3/12 flex justify-center">
              <ImageCrop setFile={setFileImageCrop} />
            </div>
            {/* right infor */}
            <div className="lg:pl-5 lg:w-9/12 text-sm w-full pt-2">
              {/* name */}
              <div>
                Title <span className="text-red-500">*</span>
              </div>
              <input
                type="text"
                required
                className="outline-1 outline-gray-400 outline rounded-sm w-full px-2 py-0.5"
                value={playlist.name}
                onChange={(e) =>
                  setPlaylist({ ...playlist, name: e.target.value })
                }
              />
              {/* permalink */}
              <div className="mt-3">
                Permalink <span className="text-red-500">*</span>
              </div>
              <div className="relative md:flex items-center">
                <label className="inline">
                  soundcloud.com/nguyennhulong9d1/sets/
                </label>
                <input
                  type="text"
                  required
                  className="rounded-sm py-0.5 w-full"
                  value={permalink}
                  onChange={(e) => setPermalink(e.target.value)}
                  ref={permalinkRef}
                />
                <BiEdit
                  className="absolute top-5 md:top-1 right-0 hover:cursor-pointer"
                  size={20}
                  onClick={() => permalinkRef.current.focus()}
                />
              </div>

              <div className="pt-3 text-sm">
                <span className="pr-4">Privacy:</span>
                <input
                  type="radio"
                  name="privacy"
                  value="public"
                  checked={playlist.public === true}
                  onChange={(e) => setPlaylist({ ...playlist, public: true })}
                />
                <label className="pl-1 pr-1" htmlFor="privacy">
                  Public
                </label>
                <input
                  type="radio"
                  name="privacy"
                  value="private"
                  checked={playlist.public === false}
                  onChange={(e) => setPlaylist({ ...playlist, public: false })}
                />
                <label className="pl-1" htmlFor="privacy">
                  Private
                </label>
                <br />
              </div>
              {/* tag*/}
              <div className="mt-2">Additional tags</div>
              <input
                type="text"
                required
                className="outline-1 outline-gray-400 outline rounded-sm w-full px-2 py-0.5"
                placeholder="Add tags to describe the genre and mood of your playlist"
              />
              {/* description */}
              <div className="mt-2">Description</div>
              <textarea
                type="text"
                required
                className="outline-1 outline-gray-400 outline rounded-sm w-full px-2 py-0.5"
                rows={5}
                placeholder="Describe your playlist"
              />
              {/* button */}
              <div className="mt-5 text-right">
                <button className="secondary-button" onClick={closeModal}>
                  Cancel
                </button>

                {/* save button */}
                <button className="primary-button" onClick={save}>
                  {loading ? (
                    <div>
                      Please wait{" "}
                      <img
                        className="inline-block"
                        src={loadingimage}
                        alt=""
                        width={15}
                        height={15}
                      />
                    </div>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
              <div className="text-red-400 italic">{error}</div>
            </div>
          </div>
        ) : (
          <div className="lg:w-[1000px]">
            {/* button */}
            <div className="mt-5 text-right pb-5">
              <button className="secondary-button" onClick={closeModal}>
                Cancel
              </button>

              {/* save button */}
              <button className="primary-button" onClick={save}>
                {loading ? (
                  <div>
                    Please wait{" "}
                    <img
                      className="inline-block"
                      src={loadingimage}
                      alt=""
                      width={15}
                      height={15}
                    />
                  </div>
                ) : (
                  "Save"
                )}
              </button>
            </div>
            {playlist.tracks.map((item, index) => {
              return (
                <EditPlaylistTrackCard
                  track={item}
                  key={index}
                  removeTrackFromPlaylist={removeTrackFromPlaylist}
                />
              );
            })}
          </div>
        )}
      </CustomModal>
    )
  );
};

{
  /* login modal */
}

export default EditPlaylistModal;
