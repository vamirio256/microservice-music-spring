const notificationReducer = (
  state = {
    text: "Service is under development.",
    isShowed: false,
  },
  action
) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return {
        text: action.text ? action.text : "Service is under development.",
        isShowed: true,
      };
    case "CLOSE_NOTIFICATION":
      return {
        text: action.text ? action.text : "Service is under development.",
        isShowed: false,
      };
    default:
      return state;
  }
};
export default notificationReducer;
