const progressReducer = (state = 0, action) => {
  switch (action.type) {
    case "UPDATE_PROGRESS":
      return action.progress;

    default:
      return state;
  }
};
export default progressReducer;
