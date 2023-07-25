export const getRecommentUser = async () => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/users/recommend`;
    const token = "Bearer " + localStorage.getItem("token");
    const userResponse = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const user = await userResponse.json();
    return user;
  };
  