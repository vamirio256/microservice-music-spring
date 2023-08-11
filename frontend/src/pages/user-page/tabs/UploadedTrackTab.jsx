import React, { useEffect } from "react";
import TrackCard from "../../../components/track/TrackCard";
import TrackWaveform from "../../../components/track/TrackWaveform";
import { deleteTrack } from "../../../apis/track/deleteTrack";
import { useDispatch } from "react-redux";

const UploadedTrackTab = ({ tracks }) => {

  return (
    <>
      {tracks.length != 0 ? (
        <div className="">
          {tracks.map((track, index) => (
            <TrackWaveform track={track} key={index} haveOnDelete={true} />
          ))}
        </div>
      ) : (
        <div>This user haven't upload any track yet</div>
      )}
    </>
  );
};

export default UploadedTrackTab;
