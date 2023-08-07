const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case "APPEND_NOTIFICATION":
      return [
        ...state,
        {
          text: action.text ? action.text : "Service is under development.",
          image: action.image,
          name: action.name,
          icon: action.icon
        },
      ];
    case "REMOVE_NOTIFICATION":
      state.shift();
      return [...state];
    case "REMOVE_ALL_NOTIFICATION":
      if (state.length == 0) {
        return state;
      }
      return [];
    default:
      return state;
  }
};
export default notificationReducer;
