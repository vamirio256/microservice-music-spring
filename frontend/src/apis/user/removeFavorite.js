export const removeFavorite = async (id) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");
      const url = `${process.env.REACT_APP_API_BASE_URL}/users/favorite/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: token,
        //   "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("An error occurred while retrieving the playlist:", error);
    }
  };
  