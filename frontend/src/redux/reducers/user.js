const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.user;
    case "REMOVE_TRACK":
      return {
        ...state,
        profile: {
          ...state.profile,
          tracks: state.profile.tracks.filter(
            (track) => track.id !== action.id
          ),
        },
      };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        profile: {
          ...state.profile,
          favorites: state.profile.favorites.filter(
            (fav) => fav.track.id !== action.id
          ),
        },
      };
    case "ADD_FAVORITE":
      return {
        ...state,
        profile: {
          ...state.profile,
          favorites: [
            {
              addedAt: new Date(),
              track: action.track,
            },
            ...state.profile.favorites,
          ],
        },
      };
    default:
      return state;
  }
};
export default userReducer;
