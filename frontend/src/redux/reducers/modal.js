const modalReducer = (
  state = {
    login: false,
    signUp: false,
    playlist: false,
    confirm: false,
  },
  action
) => {
  switch (action.type) {
    case "OPEN_MODAL_LOGIN":
      for (let key in state) {
        state[key] = false;
      }
      return {
        ...state,
        login: true,
      };
    case "CLOSE_MODAL_LOGIN":
      return {
        ...state,
        login: false,
      };
    case "OPEN_MODAL_SIGNUP":
      for (let key in state) {
        state[key] = false;
      }
      return {
        ...state,
        signUp: true,
      };
    case "CLOSE_MODAL_SIGNUP":
      return {
        ...state,
        signUp: false,
      };
    case "OPEN_MODAL_PLAYLIST":
      for (let key in state) {
        state[key] = false;
      }
      return {
        ...state,
        playlist: true,
      };
    case "CLOSE_MODAL_PLAYLIST":
      return {
        ...state,
        playlist: false,
      };
    case "OPEN_MODAL_CONFIRM":
      for (let key in state) {
        state[key] = false;
      }
      return {
        ...state,
        confirm: true,
      };
    case "CLOSE_MODAL_CONFIRM":
      return {
        ...state,
        confirm: false,
      };
    default:
      return state;
  }
};
export default modalReducer;
