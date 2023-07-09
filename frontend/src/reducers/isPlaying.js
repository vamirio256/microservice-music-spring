const isPlayingReducer = (state = false, action) => {
  switch (action.type) {
    case "SETPLAYING":
      return action.play;
    default:
      return state;
  }
};
export default isPlayingReducer;
