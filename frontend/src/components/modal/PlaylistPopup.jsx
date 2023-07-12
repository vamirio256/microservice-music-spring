import React, { useState } from "react";



const PlaylistPopup = () => {
  const [active_tab, set_active_tab] = useState("create_a_playlist");
  const active_style = "text-primary border-b-2 border-b-primary border-solid";
  const hover = " hover:border-b-2 hover:border-b-black hover:border-solid";
  return (
    <div className="container block m-auto">
      {/* Top bar */}
      <div className="mx-9 mt-10 text-lg">
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
          } mr-9`}
          onClick={() => set_active_tab("create_a_playlist")}
        >
          Create a playlist
        </button>
      </div>
      {/* content */}
      <div className="mx-9">
        {/* add_to_playlist */}
        <div className={active_tab === "add_to_playlist" ? "block" : "hidden"}>
          <div className="mt-5">
            <PlaylistPopupItem />
            <PlaylistPopupItem />
            <PlaylistPopupItem />
          </div>
        </div>

        {/* create playlist */}
        <div
          className={active_tab === "create_a_playlist" ? "block" : "hidden"}
        >
          <div className="pt-5 w-full">
            <div>
              Title <span className="text-red-500">*</span>
            </div>
            <input
              type="text"
              required
              className="outline-1 outline-gray-400 outline rounded-sm w-full px-2 py-1"
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

              <button className="primary-button block ml-auto">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlaylistPopupItem = () => {
  return (
    <div className="mb-2 flex text-sm ml-3 items-center">
      <img
        src="https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w="
        alt=""
        className="w-5 h-5"
      />

      {/* titile */}
      <div className="text-gray-500 pl-5">Ronboogz</div>
      {/* button add to playlist*/}

      <div className="ml-auto flex">
        <button className="outline-button">Add to Playlist</button>
      </div>
    </div>
  );
};

export default PlaylistPopup;
