export const search = async (searchQuery) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/tracks/search?query=${searchQuery}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("token"))["jwtToken"],
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
};
