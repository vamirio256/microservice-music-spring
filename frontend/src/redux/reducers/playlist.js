const playlistReducer = (state = null, action) => {
  switch (action.type) {
    case "ADDTOPLAYLIST1":
      if (
        state.playlist_data_1.list_data.findIndex((object) => {
          return object.title === action.song.title;
        }) > -1
      ) {
        return state;
      }
      state.playlist_data_1.list_data.push(action.song);
      const clone1 = structuredClone(state);
      return clone1;
    case "ADDTOPLAYLIST2":
      if (
        state.playlist_data_2.list_data.findIndex((object) => {
          return object.title === action.song.title;
        }) > -1
      ) {
        return state;
      }
      state.playlist_data_2.list_data.push(action.song);
      const clone2 = structuredClone(state);
      return clone2;
    default:
      return state;
  }
};
export default playlistReducer;
