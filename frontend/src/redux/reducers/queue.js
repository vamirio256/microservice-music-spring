const addTrackToQueue = (queue, track) => {
  if (!queue.find((item) => item.id === track.id)) {
    return [...queue, track];
  }
};
const queueReducer = (state = [], action) => {
  switch (action.type) {
    case "APPEND_QUEUE":
      // add to queue if track not include
      return addTrackToQueue(state, action.track);
    case "EMPTY_QUEUE":
      return [];
    default:
      return state;
  }
};
export default queueReducer;
