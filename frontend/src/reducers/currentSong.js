import { songsdata } from "../contexts/dummy_data";

const currentSongReducer = (state = songsdata[0], action) => {
  switch (action.type) {
    case "CHANGESONG":
      return action.song;
    default:
      return state;
  }
};
export default currentSongReducer;
