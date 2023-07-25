import replace from "lodash/replace";

export const formatNumberForDB = (number: string) => {
  return replace(number, /\s/g, "");
};

export const formatNumberForContactTable = (number: string) => {
  const lastSixNumbers = number.slice(-6);
  const middleNumbers = number.slice(-8, -6);
  const firstNumbers = number.slice(0, -8);
  return `${firstNumbers} ${middleNumbers} ${lastSixNumbers}`;
};
