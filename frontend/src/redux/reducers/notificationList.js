const notificationListReducer = (state = [], action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION_RIGHTBAR":
      return [
        ...state,
        {
          text: action.text ? action.text : "Service is under development.",
          // isVisible: false,
        },
      ];
    case "CLOSE_NOTIFICATION_RIGHTBAR":
      state.shift();
      return [...state];
    // case "SET_OPACITY_RIGHTBAR":
    //   console.log(state);
    //   state[action.index].isVisible = true;
    //   return [...state];
    default:
      return state;
  }
};
export default notificationListReducer;
