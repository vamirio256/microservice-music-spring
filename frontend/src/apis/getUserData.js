export const getUserData = async () => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/users/1`;
  const userResponse = await fetch(url, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("token"))["jwtToken"],
    },
  });
  const user = await userResponse.json();
  return user;
};
