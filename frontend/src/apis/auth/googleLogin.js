export const googleLogin = async () => {
    console.log("being called")
  const url = `${process.env.REACT_APP_API_BASE_URL}/oauth2/authorization/google`;

  const response = await fetch(url, {
    method: "GET",
  });
  console.log(response);
  return response;
};
