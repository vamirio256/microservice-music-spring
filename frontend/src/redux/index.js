import { combineReducers } from "redux";


import historyReducer from "./reducers/history";
import modalReducer from "./reducers/modal";
import notificationReducer from "./reducers/notification";
import playingReducer from "./reducers/playing";
import playlistReducer from "./reducers/playlist";
import progressReducer from "./reducers/progress";
import userReducer from "./reducers/user";
import queueReducer from "./reducers/queue";

const allReducers = combineReducers({
  historyReducer: historyReducer,
  playlistReducer: playlistReducer,
  modalReducer: modalReducer,
  progressReducer: progressReducer,
  notificationReducer: notificationReducer,
  userReducer: userReducer,
  playingReducer: playingReducer,
  queueReducer: queueReducer
});

export default allReducers;
