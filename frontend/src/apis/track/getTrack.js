export const getTrack = async (id) => {
  try {
    const url = `${process.env.REACT_APP_API_BASE_URL}/tracks/${id}`;
    const token = "Bearer " + localStorage.getItem("token");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: token,
      },
    });
    return response;
  } catch (e) {
    console.error("Error when getting tracks", e);
  }
};
