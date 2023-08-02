const historyReducer = (state = [], action) => {
  switch (action.type) {
    case "APPEND_TRACK":
      const updatedSongs = state.filter(
        (song) => song.audioUrl !== action.song.audioUrl
      );
      return [action.song, ...updatedSongs];
    // case "APPEND_TRACK":
    //   const { song } = action;
    //   const updatedById = {
    //     ...state.trackHistory.byId,
    //     [song.id]: song, // Assuming the track has a unique ID (e.g., 'id' property)
    //   };
    //   const updatedIds = [...state.trackHistory.ids];
    //   if (!updatedIds.includes(song.id)) {
    //     updatedIds.push(song.id);
    //   }
    //   return {
    //     ...state,
    //     trackHistory: {
    //       ids: updatedIds,
    //       byId: updatedById,
    //     },
    //   };
    case "ADD_TO_NEXT":
      state.splice(action.pos + 1, 0, action.song);
      return state;
    default:
      return state;
  }
};
export default historyReducer;
