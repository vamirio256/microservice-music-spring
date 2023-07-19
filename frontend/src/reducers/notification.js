const notificationReducer = (
  state = { text: "Service is under development.", display: false },
  action
) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return {
        text: action.text ? action.text : state.text,
        display: true,
      };
    case "HIDE_NOTIFICATION":
      return {
        text: action.text ? action.text : state.text,
        display: false,
      };
    default:
      return state;
  }
};
export default notificationReducer;
