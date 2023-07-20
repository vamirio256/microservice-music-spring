const modalPlaylistReducer = (state = {}, action) => {
  switch (action.type) {
    case "OPEN_MODAL_PLAYLIST":
      return {
        isShowed: true,
        track: action.track,
      };
    case "CLOSE_MODAL_PLAYLIST":
      return {
        ...state,
        isShowed: false,
      };
    default:
      return state;
  }
};
export default modalPlaylistReducer;
