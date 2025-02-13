export const formateDate = (textDate: string) => {
  const date = new Date(textDate);
  return date
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .replace(",", "");
};
