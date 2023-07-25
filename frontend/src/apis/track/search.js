export const search = async (searchQuery) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/tracks/search?query=${searchQuery}`;
  const token = "Bearer " + localStorage.getItem("token");
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: token
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
};
