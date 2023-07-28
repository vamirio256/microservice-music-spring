import { getUserData } from "../../apis/user/getUserData";

export const fetchUserData = (id) => async (dispatch) => {
  try {
    const response = await getUserData(id);
    dispatch({ type: "SET_USER", user: response });
  } catch (error) {
    console.error(error);
  }
};
