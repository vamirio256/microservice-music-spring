const likeReducer = (state = null, action) => {
  switch (action.type) {
    case "LIKE":
      state.data_slide.push(action.song);
      const cloneLike = structuredClone(state);
      return cloneLike;
    case "UNLIKE":
      state.data_slide = state.data_slide.filter(
        (item) => item.title !== action.song.title
      );
      const clone = structuredClone(state);
      return clone;
    default:
      return state;
  }
};
export default likeReducer;
