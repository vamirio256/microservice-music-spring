export const search = async (searchQuery) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/tracks/search?query=${searchQuery}`;
  console.log(url);
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
    console.log(data);
    return data;
  }
};
