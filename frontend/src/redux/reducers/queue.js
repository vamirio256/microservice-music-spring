const queueReducer = (state = [], action) => {
  switch (action.type) {
    case "APPEND_QUEUE":
      return action.tracks;
    case "EMPTY_QUEUE":
      if (state.length > 0) {
        return [];
      }
      return state;

    default:
      return state;
  }
};
export default queueReducer;
