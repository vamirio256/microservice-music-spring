import React, { useRef, useState } from "react";
import {
  AiFillCamera,
  AiFillCloseSquare,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import NotificationBar from "../../components/notification/NotificationBar";
import loadingimage from "../../assets/images/loading-gif.gif";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
export const UploadPage = () => {
  const fileInputRef = useRef(null);
  const fileImageInputRef = useRef(null);
  const [upload_display, set_upload_display] = useState(true);
  const [fileMusic, setFileMusic] = useState();
  const [name, setName] = useState("");
  const [image, setImage] = useState(undefined);

  const [crop, setCrop] = useState({
    unit: "px",
    width: 150,
    height: 150,
  });

  const imageRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef(null);

  function loadfileImage(event) {
    setImage(event.target.files[0]);
  }
  const onImageLoaded = (e) => {
    // getCroppedImage();
  };

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const handleFileMusic = (e) => {
    set_upload_display(false);

    setFileMusic(e.target.files[0]);
  };
  const uploadUrl = `${process.env.REACT_APP_API_BASE_URL}/tracks`;
  async function getCroppedImage() {
    if (imageRef && crop.width && crop.height) {
      const canvas = document.createElement("canvas");
      const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
      const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
      const ctx = canvas.getContext("2d");

      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;

      console.log(imageRef.current.naturalWidth);
      ctx.drawImage(
        imageRef.current,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
      );

      const file = await canvasToFile(canvas, "cropped.jpg", "image/jpeg");
      return file;
    }
  }
  function canvasToFile(canvas, fileName, mimeType) {
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          const file = new File([blob], fileName, { type: mimeType });
          resolve(file);
        },
        mimeType,
        1 // Quality (1 is the maximum quality)
      );
    });
  }

  const uploadFile = async () => {
    if (image == undefined) {
      setError("Please choose music image");
      return;
    }
    const fileImage2 = await getCroppedImage();
    console.log(URL.createObjectURL(fileImage2));
    if (name == "") {
      setError("Please provide music name");
      return;
    }

    setLoading(true); // Start loading
    const fileImage = await getCroppedImage();
    const formData = new FormData();
    formData.append(
      "track",
      new Blob([JSON.stringify({ name: name, coverUrl: "", audioUrl: "" })], {
        type: "application/json",
      })
    );
    formData.append("cover", fileImage);
    formData.append("audio", fileMusic);

    try {
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      });

      if (response.status === 200) {
        alert("Upload success");
        set_upload_display(true);
        fileInputRef.current.value = "";
        setImage(undefined);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      alert("Error occurred while uploading");
    }

    setLoading(false); // Stop loading
  };
  function cancalUpload() {
    set_upload_display(true);
    fileInputRef.current.value = "";
  }

  return (
    <>
      <div className="p-5 bg-[#FFF8E6]">
        This is a personal project, so that the file support is limited!!!
      </div>
      <div className={"flex justify-center flex-col items-center"}>
        {/* upload usage */}
        <div className="lg:max-w-[800px] w-full mt-10 p-5 lg:p-10 border-[1px] border-[#f2f2f2]">
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
              : "max-w-[800px] w-full mt-3 shadow-lg p-5 lg:p-10 border-[1px] border-[#f2f2f2]"
          }
        >
          <h1 className="text-center">
            Drag and drop your tracks & albums here
          </h1>
          {/* file music upload */}
          <input
            id="file-upload"
            type="file"
            className="px-10 py-2 bg-orange-400 block m-auto mt-3 shadow-md bg-orange text-white w-full max-w-[400px]"
            accept=".MP3, .FLAC, .WAV, .ALAC, .AIFF"
            onChange={handleFileMusic}
            ref={fileInputRef}
          />
          <br />
          {/* <div className="text-center">
            <input
              type="checkbox"
              id="is_playlist"
              name="is_playlist"
              value="is_playlist"
            />
            <label htmlFor="is_playlist" className="pl-2 text-xs">
              Make a playlist when multiple files are selected
            </label>
          </div> */}
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
          <div className="mt-10 text-center">
            Provide FLAC, WAV, ALAC, or AIFF htmlFor highest audio quality.
          </div>
        </div>

        {/* add image  */}
        <div
          className={`lg:max-w-[800px] w-full mt-10 p-5 lg:p-10  shadow-xl flex  ${
            upload_display ? "hidden" : undefined
          }`}
        >
          {/* image */}
          <div>
            {image ? (
              <div className="relative">
                <div
                  className="absolute top-[-26px] right-1 z-10 flex items-center"
                  onClick={() => setImage(undefined)}
                >
                  Close
                  <AiOutlineCloseCircle size={15} />
                </div>
                <ReactCrop
                  // src={URL.createObjectURL(image)}

                  crop={crop}
                  onChange={onCropChange}
                  aspect={1}
                >
                  <img
                    onLoad={onImageLoaded}
                    src={URL.createObjectURL(image)}
                    className="w-[200px] h-[200px] object-contain"
                    ref={imageRef}
                  />
                </ReactCrop>
              </div>
            ) : (
              <div>
                <label
                  ref={ref}
                  htmlFor="image_upload"
                  className="inline-block cursor-pointer px-2 pt-[150px] w-[200px] lg:px-5 bg-cover pb-5 bg-slate-600 bg-no-repeat bg-center"
                >
                  <span className="bg-red-100 p-2 flex justify-center items-center">
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
                  ref={fileImageInputRef}
                />
              </div>
            )}
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
            <div className="pt-3 text-sm">
              <span className="pr-4">Privacy:</span>
              <input
                type="radio"
                name="privacy"
                value="public"
                defaultChecked
              />
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
              <button className="secondary-button" onClick={cancalUpload}>
                Cancel
              </button>

              {/* save button */}
              <button className="primary-button" onClick={uploadFile}>
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
      </div>
    </>
  );
};
