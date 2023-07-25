const isPlayingReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_PLAYING":
      return action.play;
    default:
      return state;
  }
};
export default isPlayingReducer;
