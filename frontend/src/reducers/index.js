import { combineReducers } from "redux";

import currentSongReducer from "./currentSong";

import isPlayingReducer from "./isPlaying";
import likeReducer from "./like";
import playlistReducer from "./playlist";
import songsReducer from "./songs";

const allReducers = combineReducers({
  songsReducer: songsReducer,
  currentSongReducer: currentSongReducer,
  isPlayingReducer: isPlayingReducer,
  likeReducer: likeReducer,

  playlistReducer: playlistReducer,
});
export default allReducers;
