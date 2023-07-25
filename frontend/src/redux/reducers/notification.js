const notificationReducer = (
  state = { text: "Service is under development.", isShowed: false },
  action
) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return {
        text: action.text ? action.text : state.text,
        isShowed: true,
      };
    case "CLOSE_NOTIFICATION":
      return {
        text: action.text ? action.text : state.text,
        isShowed: false,
      }
    default:
      return state;
  }
};
export default notificationReducer;
