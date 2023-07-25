export const createPlaylist = async (formData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization:
          "Bearer " + localStorage.getItem("token")
        },
        body: formData,
      }
    );

    if (response.status === 200) {
      alert("Create success");
    } else {
      alert("Something went wrong");
    }
  } catch (error) {
    alert("Error occurred while uploading");
  }
};
