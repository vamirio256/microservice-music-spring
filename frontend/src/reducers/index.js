import { combineReducers } from "redux";

import currentSongReducer from "./currentSong";

import isPlayingReducer from "./isPlaying";
import likeReducer from "./like";
import playlistReducer from "./playlist";
import songHistoryReducer from "./songHistory";
import modalReducer from "./modal";
import progressReducer from "./progress";
import modifyProgressReducer from "./modifyProgress";
import notificationReducer from "./notification";
import queueReducer from "./queue";
import modalPlaylistReducer from "./modalPlaylist";

const allReducers = combineReducers({
  songHistoryReducer: songHistoryReducer,
  currentSongReducer: currentSongReducer,
  isPlayingReducer: isPlayingReducer,
  likeReducer: likeReducer,
  playlistReducer: playlistReducer,
  modalReducer: modalReducer,
  progressReducer: progressReducer,
  modifyProgressReducer: modifyProgressReducer,
  notificationReducer: notificationReducer,
  queueReducer: queueReducer,
  modalPlaylistReducer: modalPlaylistReducer,
});
export default allReducers;
