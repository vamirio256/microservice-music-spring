import React from "react";
import Card from "./Card";

const TrackCard = ({ title, artist }) => {
  return (
    <div>
      <Card title={title} image="https://example.com/my-image.jpg">
        <p>{artist}</p>
      </Card>
    </div>
  );
};

export default TrackCard;
