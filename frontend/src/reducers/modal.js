const modalReducer = (state = false, action) => {
    switch (action.type) {
      case "TOGGLE_MODAL":
        return action.modal;
      default:
        return state;
    }
  };
  export default modalReducer;
  