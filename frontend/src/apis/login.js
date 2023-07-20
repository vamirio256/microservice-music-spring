export const login = async (email, password) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/auth/authenticate`;
  console.log(url);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const token = await response.json();
  return;
};
