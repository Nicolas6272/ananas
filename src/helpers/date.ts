export const getTodayDate = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getLocalHourFromTimestamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString();
};

export const getWeekDayFirstThreeLetters = (date: Date) => {
  const weekday = date
    .toLocaleDateString("fr-FR", { weekday: "short" })
    .slice(0, 3);
  return firstLetterToUpperCase(weekday);
};

export const firstLetterToUpperCase = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
