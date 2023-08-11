const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.user;
    case "REMOVE_TRACK":
      state.profile.tracks = state.profile.tracks.filter(
        (track) => track.id !== action.id
      );
      return state;
    case "REMOVE_FAVORITE":
      state.profile.favorites = state.profile.favorites.filter(
        (fav) => fav.track.id !== action.id
      );
      return state;
    case "ADD_FAVORITE":
      state.profile.favorites.unshift({
        addedAt: new Date(),
        track: action.track,
      });
      return state;
    default:
      return state;
  }
};
export default userReducer;
