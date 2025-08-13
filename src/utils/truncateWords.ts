export const truncateWords = (text: string, wordLimit = 15): string => {
  if (!text) return "";

  const words = text.split(" ");
  const truncated = words.slice(0, wordLimit).join(" ");

  return words.length > wordLimit ? truncated + "..." : truncated;
};
