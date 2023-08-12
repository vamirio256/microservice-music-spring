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
const EditUserModal = () => {
  // playlist riêng để xóa bài hát trong playlist
  const [user, setUser] = useState({});

  const [permalink, setPermalink] = useState("test");

  const [fileImageCrop, setFileImageCrop] = useState();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const permalinkRef = useRef();

  const isShowEditUser = useSelector(
    (state) => state.modalReducer.editUser.isShowed
  );

  //playlist redux
  const userRedux = useSelector((state) => state.userReducer);
  useEffect(() => {
    setUser(userRedux);
  }, [userRedux]);

  function closeModal() {
    dispatch({ type: "CLOSE_MODAL_EDIT_PLAYLIST" });
    setUser(userRedux);
  }

  const active_style = "text-primary border-b-2 border-b-primary border-solid";

  return (
    user && (
      <CustomModal modalIsOpen={isShowEditUser} closeModel={closeModal}>
        {/* Top bar */}
        <div className="mt-2 text-lg">
          <button className={`${active_style} mr-9`}>Edit your profile</button>
        </div>

        <div
          className={`w-full mt-5 p-5 lg:p-10 flex-col lg:flex-row flex lg:w-[1000px] `}
        >
          {/* image */}
          <div className="w-full lg:w-3/12 flex justify-center">
            <ImageCrop
              setFile={setFileImageCrop}
              rounded={true}
              defaultImage={user.avatarUrl}
            />
          </div>
          {/* right infor */}
          <div className="lg:pl-5 lg:w-9/12 text-sm w-full pt-2">
            {/* name */}
            <div className="mb-1">
              Display name <span className="text-red-500">*</span>
            </div>
            <input
              type="text"
              required
              className="outline-1 outline-gray-400 outline rounded-sm w-full px-2 py-3"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
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

            {/* description */}
            <div className="mt-2">Bio</div>
            <textarea
              type="text"
              required
              className="outline-1 outline-gray-400 outline rounded-sm w-full px-2 py-0.5"
              rows={5}
              placeholder="Tell a little bit about yourself"
            />
            {/* button */}
            <div className="mt-5 text-right">
              <button className="secondary-button" onClick={closeModal}>
                Cancel
              </button>

              {/* save button */}
              <button className="primary-button">
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
      </CustomModal>
    )
  );
};

{
  /* login modal */
}

export default EditUserModal;
