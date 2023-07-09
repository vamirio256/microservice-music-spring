import React, { useRef, useState } from "react";
import { AiFillCamera } from "react-icons/ai";

export const UploadPage = () => {
  const [upload_display, set_upload_display] = useState(true);
  const ref = useRef(null);
  function loadfile(event) {
    ref.current.style.backgroundImage =
      "url(" + URL.createObjectURL(event.target.files[0]) + ")";
  }
  return (
    <div className={"flex justify-center flex-col items-center"}>
      <div
        className={
          !upload_display ? "hidden" : "w-[800px] mt-10 shadow-xl p-10"
        }
      >
        <h1 className="text-center">Drag and drop your tracks & albums here</h1>

        <input
          id="file-upload"
          type="file"
          className="px-10 py-2 bg-orange-400 block m-auto mt-3 shadow-md bg-orange text-white"
          accept=".MP3, .FLAC, .WAV, .ALAC, .AIFF"
          onChange={() => set_upload_display(false)}
        />

        <br />
        <div className="text-center">
          <input
            type="checkbox"
            id="is_playlist"
            name="is_playlist"
            value="is_playlist"
          />
          <label htmlFor="is_playlist" className="pl-2 text-xs font-semibold">
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
          Provide FLAC, WAV, ALAC, or AIFF htmlFor highest audio quality. Learn
          more about lossless HD.
        </div>
      </div>
      <div
        className={`w-[800px] mt-10 shadow-xl p-10 flex ${
          upload_display ? "hidden" : undefined
        }`}
      >
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
            accept=".JPEG,.PNG, .JPG"
            className="hidden"
            onChange={loadfile}
          />
        </div>
        <div className="pl-5 w-8/12">
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
            <br />
          </div>
          <div className="mt-5 text-right">
            <button
              className="mr-4 bg-white text-black"
              onClick={() => set_upload_display(true)}
            >
              Cancel
            </button>
            <button>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};
