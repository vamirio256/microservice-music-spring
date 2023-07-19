const queueReducer = (state = [], action) => {
  switch (action.type) {
    case "ADDTOQUEUE":
      return action.songs;

    default:
      return state;
  }
};
export default queueReducer;
