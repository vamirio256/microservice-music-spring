export const getUserData = async (id) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/users/${id}`;
  const token = "Bearer " + localStorage.getItem("token");
  const userResponse = await fetch(url, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: token,
    },
  });
  const user = await userResponse.json();
  return user;
};
