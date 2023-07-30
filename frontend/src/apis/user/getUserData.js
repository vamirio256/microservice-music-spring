export const getUserData = async (id) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/users/${id}`;
  const token = "Bearer " + localStorage.getItem("token");
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: token,
    },
  });
  return response;
};
