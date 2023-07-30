export const register = async (username, email, password) => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/auth/register`;
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    return response;
  };
  