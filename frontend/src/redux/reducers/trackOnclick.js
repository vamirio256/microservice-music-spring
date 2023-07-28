const trackOnclickReducer = (state = { id: 0 }, action) => {
  switch (action.type) {
    case "SET_TRACK_ONCLICK":
      return action.track;

    default:
      return state;
  }
};
export default trackOnclickReducer;
