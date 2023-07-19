import { combineReducers } from "redux";

import currentSongReducer from "./currentSong";

import isPlayingReducer from "./isPlaying";
import likeReducer from "./like";
import playlistReducer from "./playlist";
import songHistoryReducer from "./songHistory";
import modalReducer from "./modal";

const allReducers = combineReducers({
  songHistoryReducer: songHistoryReducer,
  currentSongReducer: currentSongReducer,
  isPlayingReducer: isPlayingReducer,
  likeReducer: likeReducer,
  playlistReducer: playlistReducer,
  modalReducer: modalReducer,
});
export default allReducers;
