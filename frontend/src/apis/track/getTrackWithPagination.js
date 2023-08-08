export const getTrackWithPagination = async (offset, page) => {
  try {
    const url = `${process.env.REACT_APP_API_BASE_URL}/tracks/?offset=${offset}&page=${page}`;
    const token = "Bearer " + localStorage.getItem("token");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: token,
      },
    });
    return await response.json();
  } catch (e) {
    console.error("Error when getting tracks", e);
  }
};
