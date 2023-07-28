import React from "react";
import TrackCard from "../../../components/trackcard/TrackCard";

const UploadedTrackTab = ({ tracks }) => {
  console.log(tracks);
  return (
    <>
      {tracks ? (
        <div className="grid grid-cols-4 gap-4">
          {tracks.map((track, index) => (
            <TrackCard track={track} key={index} />
          ))}
        </div>
      ) : (
        <div>This user haven't upload any track yet</div>
      )}
    </>
  );
};

export default UploadedTrackTab;
