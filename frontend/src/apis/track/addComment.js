export const addComment = async (comment, id) => {
  try {
    const encodedComment = comment.replaceAll(" ", "%20");
    const url = `${process.env.REACT_APP_API_BASE_URL}/tracks/${id}/comments?context=${encodedComment}`;
    const token = "Bearer " + localStorage.getItem("token");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: token,
      },
    });
    await response;
    return;
  } catch (e) {
    console.error("Error when getting tracks", e);
  }
};
