export const vnpayPayment = async (amount) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/payment/vnpay?amount=${amount}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response;
  } catch (error) {
    alert("Error occurred while uploading");
  }
};
