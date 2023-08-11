export const getPlaylist = async (playlistId) => {
  try {
    const token = "Bearer " + localStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_BASE_URL}/playlist/${playlistId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("An error occurred while retrieving the playlist:", error);
  }
};
