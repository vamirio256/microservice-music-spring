export const formatDate = (time) => {
  const [year, month, dayOfMonth, hour, minute, second, nanoOfSecond] =
  time;

  const date = new Date(
    year,
    month - 1,
    dayOfMonth,
    hour,
    minute,
    second,
    Math.floor(nanoOfSecond / 1000000)
  );

  console.log("JavaScript Date: " + date.toISOString());
};
