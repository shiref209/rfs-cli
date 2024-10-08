export const toLowerCaseFirstChar = (str) => {
  if (!str) return str;
  return str.charAt(0).toLowerCase() + str.slice(1);
};

export const toUpperCaseFirstChar = (str) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};
