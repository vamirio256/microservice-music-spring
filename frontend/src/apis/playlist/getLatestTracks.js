export const getLatestTracks = async () => {
  try {
    const token = "Bearer " + localStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_BASE_URL}/tracks/latest`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    const playlistData = await response.json();
    return playlistData;
  } catch (error) {
    console.error("An error occurred while retrieving the playlist:", error);
  }
};
