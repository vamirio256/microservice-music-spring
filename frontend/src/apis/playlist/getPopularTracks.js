export const getPopularTracks = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"))["jwtToken"];
      const url = `${process.env.REACT_APP_API_BASE_URL}/tracks/popular`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const playlistData = await response.json();
      return playlistData;
      //   setPlaylist(playlistData);
      //   setCurrentPlaying(playlistData.tracks[0]);
    } catch (error) {
      console.error("An error occurred while retrieving the playlist:", error);
    }
  };
  