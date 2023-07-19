import { combineReducers } from "redux";

import currentSongReducer from "./currentSong";

import isPlayingReducer from "./isPlaying";
import likeReducer from "./like";
import playlistReducer from "./playlist";
import songHistoryReducer from "./songHistory";
<<<<<<< HEAD
import modalReducer from "./modal";
=======
import progressReducer from "./progress";
>>>>>>> 7c58faa77761b91add9750813b572c5e087f561b

const allReducers = combineReducers({
  songHistoryReducer: songHistoryReducer,
  currentSongReducer: currentSongReducer,
  isPlayingReducer: isPlayingReducer,
  likeReducer: likeReducer,
  playlistReducer: playlistReducer,
<<<<<<< HEAD
  modalReducer: modalReducer,
=======
  progressReducer: progressReducer,
>>>>>>> 7c58faa77761b91add9750813b572c5e087f561b
});
export default allReducers;
