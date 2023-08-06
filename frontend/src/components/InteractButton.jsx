import React from "react";
import { useDispatch } from "react-redux";
import CopyLink from "./buttons/CopyLink";
import Edit from "./buttons/Edit";
import FavoriteButton from "./buttons/FavoriteButton";
import More from "./buttons/MoreButton";
import Share from "./buttons/Share";

const InteractButton = ({ className }) => {
  const dispatch = useDispatch();

  const buttonStyle =
    "border-[1px] border-solid px-2 py-1 text-xs rounded-sm hover:border-[#999] flex flex-row item-center mr-2";

  return (
    <>
      {/* interact button */}
      <div className={`${className} flex row mt-3`}>
        <FavoriteButton haveBorder={true} haveText={true} />
        <Share />
        <CopyLink />
        <Edit />
        <More />
      </div>
    </>
  );
};

export default InteractButton;
