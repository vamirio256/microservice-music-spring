export const login = async (email, password) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/auth/authenticate`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const token = await response.json();
  return token;
};
