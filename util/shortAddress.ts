import { Address } from "./shared/types";

export const shortAddress = (addess: Address) => {
  console.log(addess.length);
  const firstHalf = addess.split("").slice(0, (addess.length - 1) / 2);
  const shortFirstHalf = firstHalf.slice(0, (firstHalf.length - 1) / 2);

  const secondHalf = addess
    .split("")
    .slice((addess.length - 1)/2);
  const shortSecondHalf = secondHalf.slice(0, (secondHalf.length - 1) / 3);

  return shortFirstHalf.join("") + "..." + shortSecondHalf.join("");
};
