const playTrack = (state, track) => {
  if (!track) {
    return;
  }
  if (!state.track) {
    return { track: track, isPlaying: true };
  }
  if (state.track.id != track.id) {
    return { track: track, isPlaying: true };
  } else {
    if (state.isPlaying == true) {
      return { ...state, isPlaying: false };
    } else {
      return { ...state, isPlaying: true };
    }
  }
};

const playingReducer = (state = "", action) => {
  switch (action.type) {
    case "PLAY_TRACK":
      return playTrack(state, action.track);
    case "UPDATE_PROGRESS":
      return {
        ...state,
        currentProgress: action.progress,
      };
    case "UPDATE_WAVEFROM_PROGRESS":
      return {
        ...state,
        waveformProgress: action.progress,
      };
    default:
      return state;
  }
};
export default playingReducer;
