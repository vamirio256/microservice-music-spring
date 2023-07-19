const progressReducer = (state = 0, action) => {
  switch (action.type) {
    case "CHANGEPROGRESS":
      return action.progress;

    default:
      return state;
  }
};
export default progressReducer;
