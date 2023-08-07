const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case "APPEND_NOTIFICATION":
      return [
        ...state,
        {
          text: action.text ? action.text : "Service is under development.",
          // isVisible: false,
        },
      ];
    case "REMOVE_NOTIFICATION":
      state.shift();
      return [...state];
    case "REMOVE_ALL_NOTIFICATION":
      return [];
    default:
      return state;
  }
};
export default notificationReducer;
