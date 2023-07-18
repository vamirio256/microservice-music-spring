import React, { useRef, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import NotificationBar from "../../components/modal/NotificationBar";

export const UploadPage = () => {
  const [upload_display, set_upload_display] = useState(true);
  const [fileMusic, setFileMusic] = useState();
  const [name, setName] = useState("");
  const [image, setImage] = useState(undefined);
  const uploadUrl = `${process.env.REACT_APP_API_BASE_URL}/tracks`;
  const ref = useRef(null);
  // load file image
  function loadfileImage(event) {
    ref.current.style.backgroundImage =
      "url(" + URL.createObjectURL(event.target.files[0]) + ")";

    setImage(event.target.files[0]);
  }
  const token = JSON.parse(localStorage.getItem("token"))["jwtToken"];

  const handleFileMusic = (e) => {
    set_upload_display(false);

    setFileMusic(e.target.files[0]);
  };
  const uploadFile = async () => {
    const tracks = JSON.stringify({ name: name, coverUrl: "", audioUrl: "" });

    const formData = new FormData();
    formData.append("track", tracks);
    formData.append("cover", image);
    formData.append("audio", fileMusic);
    console.log(formData);
    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
      body: formData,
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <div className="p-5 bg-[#FFF8E6]">
        This is a personal project, so that the file support is limited!!!
      </div>
      <div className={"flex justify-center flex-col items-center"}>
        {/* upload usage */}
        <div className="w-[800px] mt-10 p-10 border-[1px] border-[#f2f2f2]">
          <p>0% of freeloads used</p>
          <input
            min={0}
            max={100}
            // value={50}
            type="range"
            className="range-usage w-60 accent-[#f50] h-[3px] appearance-none bg-[#ccc]"
          />
          <p>Try premium for more uploading usage.</p>
        </div>
        {/* upload */}
        <div
          className={
            !upload_display
              ? "hidden"
              : "w-[800px] mt-3 shadow-lg p-10 border-[1px] border-[#f2f2f2]"
          }
        >
          <h1 className="text-center">
            Drag and drop your tracks & albums here
          </h1>
          {/* file music upload */}
          <input
            id="file-upload"
            type="file"
            className="px-10 py-2 bg-orange-400 block m-auto mt-3 shadow-md bg-orange text-white"
            accept=".MP3, .FLAC, .WAV, .ALAC, .AIFF"
            // value={fileMusic}
            onChange={handleFileMusic}
          />
          <br />
          <div className="text-center">
            <input
              type="checkbox"
              id="is_playlist"
              name="is_playlist"
              value="is_playlist"
            />
            <label htmlFor="is_playlist" className="pl-2 text-xs">
              Make a playlist when multiple files are selected
            </label>
          </div>
          <br />
          <div className="text-center text-sm">
            <span className="pr-2">Privacy:</span>
            <input type="radio" name="privacy" value="public" />
            <label className="pl-1 pr-1" htmlFor="privacy">
              Public
            </label>
            <input type="radio" name="privacy" value="private" />
            <label className="pl-1" htmlFor="privacy">
              Private
            </label>
            <br />
          </div>
          <div className="mt-10">
            Provide FLAC, WAV, ALAC, or AIFF htmlFor highest audio quality.
          </div>
        </div>

        <NotificationBar isShow={true} />

        {/* add image  */}
        <div
          className={`w-[800px] mt-10 shadow-xl p-10 flex ${
            upload_display ? "hidden" : undefined
          }`}
        >
          {/* image */}
          <div>
            <label
              ref={ref}
              htmlFor="image_upload"
              className="inline-block cursor-pointer px-10 pt-[180px] bg-cover pb-5 bg-slate-600 bg-no-repeat bg-center"
            >
              <span className="bg-red-100 p-2">
                <AiFillCamera className="inline" /> Upload file
              </span>
            </label>
            <input
              required
              id="image_upload"
              type="file"
              accept=".JPEG,.PNG,.JPG"
              className="hidden"
              onChange={loadfileImage}
            />
          </div>
          {/* right infor */}
          <div className="pl-5 w-8/12">
            {/* name */}
            <div>
              Title <span className="text-red-500">*</span>
            </div>
            <input
              type="text"
              required
              className="outline-1 outline-gray-400 outline rounded-sm w-full px-2 py-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              <br />
            </div>

            {/* button */}
            <div className="mt-5 text-right">
              <button
                className="secondary-button"
                onClick={() => set_upload_display(true)}
              >
                Cancel
              </button>

              {/* save button */}
              <button className="primary-button" onClick={uploadFile}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
