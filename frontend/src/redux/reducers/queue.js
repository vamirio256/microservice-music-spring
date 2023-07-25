const queueReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_QUEUE":
      return action.songs;

    default:
      return state;
  }
};
export default queueReducer;
