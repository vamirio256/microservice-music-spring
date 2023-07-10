import { songsdata } from "../contexts/dummy_data";
const songsReducer = (state = songsdata, action) => {
  switch (action.type) {
    case "ADDSONG":
      state.push(action.song);
      return state;
    case "ADDTONEXT":
      state.splice(action.pos + 1, 0, action.song);
      return state;
    default:
      return state;
  }
};
export default songsReducer;
