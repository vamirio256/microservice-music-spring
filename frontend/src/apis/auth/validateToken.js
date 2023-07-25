export const validateToken = async () => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/auth/validate-token`;
  try {
    const token = "Bearer " + localStorage.getItem("token");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Error parsing token", e);
  }
};
