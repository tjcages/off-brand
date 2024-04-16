export function randomize<T>(array: T[]) {
  const clone = [...array];
  const randomized = [];
  while (clone.length > 0) {
    const index = Math.floor(Math.random() * clone.length);
    randomized.push(clone[index]);
    clone.splice(index, 1);
  }
  return randomized;
}
