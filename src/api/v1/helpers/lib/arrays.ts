export const moveInArray = function (
  arr: [] | string[],
  from: number,
  to: number,
  target: string
) {
  // Delete the item from it's current position
  let item = arr.splice(from, 1);
  // Move the item to its new position
  arr.splice(to, 0, target);
};
