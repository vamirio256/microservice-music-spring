const playingTrackReducer = (
  state = {
    track: null,
    isPlaying: false,
    progress: 0,
  },
  action
) => {
  switch (action.type) {
    case "PLAY_NEW_TRACK":
      return {
        track: state.track,
        isPlaying: true,
        progress: 0,
      };
    case "RESUME_TRACK":
      return {
        ...state,
        isPlaying: true,
      };
    case "PAUSE_TRACK":
      return {
        ...state,
        isPlaying: false,
      };
    case "PROGRESS_TRACK":
      return {
        ...state,
        progress: action.progress,
      };
    default:
      return state;
  }
};
export default playingTrackReducer;
