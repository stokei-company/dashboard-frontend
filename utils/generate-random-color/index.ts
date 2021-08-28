export const generateRandomColor = () => {
  const random = (min: number = 0, max: number = 255) =>
    Math.floor(Math.random() * max + min);
  const r = random(0, 255);
  const g = random(0, 100);
  const b = random(0, 100);
  return `hsla(${r},${g}%,${b}%,1)`;
};
