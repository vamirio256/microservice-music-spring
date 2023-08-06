const playTrack = (state, track) => {
  if (!track) {
    return;
  }
  if (!state.track) {
    console.log("!state.track");
    return { track: track, isPlaying: true };
  }
  if (state.track.id != track.id) {
    console.log("state.track.id !== track.id");
    return { track: track, isPlaying: true };
  } else {
    if (state.isPlaying == true) {
      console.log("state.isPlaying == true");
      return { ...state, isPlaying: false };
    } else {
      console.log("state.isPlaying == false");
      return { ...state, isPlaying: true };
    }
  }
};

const playingReducer = (state = "", action) => {
  switch (action.type) {
    case "PLAY_TRACK":
      return playTrack(state, action.track);
    default:
      return state;
  }
};
export default playingReducer;
