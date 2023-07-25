const modifyProgressReducer = (state = 0, action) => {
  switch (action.type) {
    case "MODIFYPROGRESS":
      return action.progress;
    default:
      return state;
  }
};
export default modifyProgressReducer;
