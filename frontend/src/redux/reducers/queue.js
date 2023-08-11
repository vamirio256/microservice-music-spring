function shuffleArray(array) {
  const shuffledArray = [...array]; // Create a copy of the original array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray;
}
const queueReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_QUEUE":
      return action.tracks;
    case "EMPTY_QUEUE":
      var index = state.findIndex(
        (track) => track.id === action.playingTrack.id
      );

      return [state[index]];
    case "SHUFFLE_QUEUE":
      var index = state.findIndex(
        (track) => track.id === action.playingTrack.id
      );
      console.log(index);
      var firstPart = state.slice(0, index + 1);
      var secondPart = state.slice(index + 1);
      secondPart = shuffleArray(secondPart);

      return [...firstPart, ...secondPart];

    default:
      return state;
  }
};
export default queueReducer;
