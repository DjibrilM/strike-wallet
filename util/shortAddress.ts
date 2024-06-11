import { Address } from "./shared/types";

export const shortAddress = (addess: Address) => {
  const firstHalf = addess.split("").slice(0, (addess.length - 1) / 3);
  const shortFirstHalf = firstHalf.slice(0, (firstHalf.length - 1) / 3);

  const secondHalf = addess
    .split("")
    .slice((addess.length - 1)/5);
  const shortSecondHalf = secondHalf.slice(0, (secondHalf.length - 1) / 5);

  return shortFirstHalf.join("") + "..." + shortSecondHalf.join("");
};
