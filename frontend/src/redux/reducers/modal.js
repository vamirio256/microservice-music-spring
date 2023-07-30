const openModal = (state, modal, func) => {
  const tempState = { ...state };
  for (let key in state) {
    tempState[key].isShowed = false;
  }
  tempState[modal].isShowed = true;
  if (func) {
    func(tempState, modal);
  }
  return tempState;
};

const closeModal = (state, modal, func) => {
  const tempState = { ...state };
  for (let key in state) {
    tempState[key].isShowed = false;
  }
  if (func) {
    func(tempState, modal);
  }
  return tempState;
};

const modalReducer = (
  state = {
    login: {
      isShowed: false,
    },
    register: {
      isShowed: false,
    },
    playlist: {
      isShowed: false,
      track: "",
    },
    confirm: {
      isShowed: false,
      context: "",
    },
  },
  action
) => {
  switch (action.type) {
    case "OPEN_MODAL_LOGIN":
      return openModal(state, "login");
    case "CLOSE_MODAL_LOGIN":
      return closeModal(state, "login");
    case "OPEN_MODAL_REGISTER":
      return openModal(state, "register");
    case "CLOSE_MODAL_REGISTER":
      return closeModal(state, "register");
    case "OPEN_MODAL_PLAYLIST":
      return openModal(state, "playlist", (state, modal) => {
        state[modal].track = action.track;
      });
    case "CLOSE_MODAL_PLAYLIST":
      return closeModal(state, "playlist", (state, modal) => {
        state[modal].track = "";
      });
    case "OPEN_MODAL_CONFIRM":
      return openModal(state, "confirm", (state, modal) => {
        state[modal].context = action.context;
      });
    case "CLOSE_MODAL_CONFIRM":
      return closeModal(state, "confirm", (state, modal) => {
        state[modal].context = "";
      });
    default:
      return state;
  }
};

export default modalReducer;
