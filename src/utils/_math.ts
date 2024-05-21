/* Easings */

export function lerp(v0: number, v1: number, t: number) {
  return v0 * (1 - t) + v1 * t;
}

/* Angles */
export function radToDeg(r: number) {
  return (r * 180) / Math.PI;
}
export function degToRad(d: number) {
  return (d * Math.PI) / 180;
}

// clamp
export function clamp(min: number, max: number, num: number) {
  return Math.min(Math.max(num, min), max);
}

// map
export function map(value: number, inLow: number, inHigh: number, outLow: number, outHigh: number) {
  return outLow + ((outHigh - outLow) * (value - inLow)) / (inHigh - inLow);
}
