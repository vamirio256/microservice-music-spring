export const getPopularTracks = async () => {
  try {
    const token = "Bearer " + localStorage.getItem("token")
    const url = `${process.env.REACT_APP_API_BASE_URL}/tracks/popular`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
    //   setPlaylist(playlistData);
    //   setCurrentPlaying(playlistData.tracks[0]);
  } catch (error) {
    console.error("An error occurred while retrieving the playlist:", error);
  }
};
