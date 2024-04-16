export function randomId(length = 10) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}

export const id = randomId();

export const removeFirst = (src: string[], element: string) => {
  const index = src.indexOf(element);
  if (index === -1) return src;
  return [...src.slice(0, index), ...src.slice(index + 1)];
};

export const addressSubstring = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
};

export const capFirst = (s: string, removeDash = false) => {
  const delimiter = removeDash ? " " : "-";
  if (s.includes("-")) {
    const words = s.split("-");
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(delimiter);
  } else {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
};