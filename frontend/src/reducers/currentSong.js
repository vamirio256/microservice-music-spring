const currentSongReducer = (state = null, action) => {
  switch (action.type) {
    case "CHANGESONG":
      return action.song;
    default:
      return state;
  }
};
export default currentSongReducer;
