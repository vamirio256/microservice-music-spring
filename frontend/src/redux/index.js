import { combineReducers } from "redux";

import currentSongReducer from "./reducers/currentSong";

import isPlayingReducer from "./reducers/isPlaying";
import likeReducer from "./reducers/like";
import playlistReducer from "./reducers/playlist";
import modalReducer from "./reducers/modal";
import progressReducer from "./reducers/progress";
import modifyProgressReducer from "./reducers/modifyProgress";
import notificationReducer from "./reducers/notification";
import queueReducer from "./reducers/queue";
import userReducer from "./reducers/user";
import historyReducer from "./reducers/history";
import playingTrackReducer from "./reducers/playingTrack";
import notificationListReducer from "./reducers/notificationList";

const allReducers = combineReducers({
  historyReducer: historyReducer,
  currentSongReducer: currentSongReducer,
  isPlayingReducer: isPlayingReducer,
  likeReducer: likeReducer,
  playlistReducer: playlistReducer,
  modalReducer: modalReducer,
  progressReducer: progressReducer,
  modifyProgressReducer: modifyProgressReducer,
  notificationReducer: notificationReducer,
  queueReducer: queueReducer,
  userReducer: userReducer,
<<<<<<< HEAD
  playingTrackReducer: playingTrackReducer,
=======
  notificationListReducer: notificationListReducer,
>>>>>>> 6e081ea8fccbc4ed0ddf987dc2d79d797058050c
});
export default allReducers;
