const songHistoryReducer = (state = [], action) => {
  switch (action.type) {
    case "ADDSONG":
      const updatedSongs = state.filter(
        (song) => song.audioUrl !== action.song.audioUrl
      );

      return [action.song, ...updatedSongs];
    case "ADDTONEXT":
      state.splice(action.pos + 1, 0, action.song);
      return state;
    default:
      return state;
  }
};
export default songHistoryReducer;
