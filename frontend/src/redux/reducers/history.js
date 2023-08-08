const historyReducer = (state = [], action) => {
  switch (action.type) {
    case "APPEND_HISTORY":
      const updatedSongs = state.filter(
        (track) => track.id !== action.track.id
      );
      return [action.track, ...updatedSongs].slice(0, 6);
    case "ADD_TO_NEXT":
      state.splice(action.pos + 1, 0, action.song);
      return state;
    default:
      return state;
  }
};
export default historyReducer;
