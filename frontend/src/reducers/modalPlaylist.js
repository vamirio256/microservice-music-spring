const modalPlaylistReducer = (state = false, action) => {
  switch (action.type) {
    case "OPEN_MODAL_PLAYLIST":
      return true;
    case "CLOSE_MODAL_PLAYLIST":
      return false;
    default:
      return state;
  }
};
export default modalPlaylistReducer;
