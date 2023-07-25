export const addFavorite = async (id) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");

      const url = `${process.env.REACT_APP_API_BASE_URL}/users/follow/${id}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: token,
        //   "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("An error occurred while retrieving the playlist:", error);
    }
  };
  