import { combineReducers } from "redux";

import currentSongReducer from "./reducers/currentSong";

import likeReducer from "./reducers/like";
import playlistReducer from "./reducers/playlist";
import modalReducer from "./reducers/modal";
import progressReducer from "./reducers/progress";
import modifyProgressReducer from "./reducers/modifyProgress";
import notificationReducer from "./reducers/notification";
import queueReducer from "./reducers/queue";
import userReducer from "./reducers/user";
import historyReducer from "./reducers/history";
import notificationListReducer from "./reducers/notificationList";

const allReducers = combineReducers({
  historyReducer: historyReducer,
  currentSongReducer: currentSongReducer,

  likeReducer: likeReducer,
  playlistReducer: playlistReducer,
  modalReducer: modalReducer,
  progressReducer: progressReducer,
  modifyProgressReducer: modifyProgressReducer,
  notificationReducer: notificationReducer,
  queueReducer: queueReducer,
  userReducer: userReducer,
  notificationListReducer: notificationListReducer,
});
export default allReducers;
