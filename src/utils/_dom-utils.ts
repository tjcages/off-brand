/* eslint-disable @typescript-eslint/no-explicit-any */

export type Position = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function calcDomPosition(
  ref: { getBoundingClientRect: () => { x: any; y: any; width: any; height: any } },
  viewport: { px: number; inner: number[]; scroll: number }
) {
  const { px, inner, scroll } = viewport;
  const { x, y, width, height } = ref.getBoundingClientRect();

  return {
    x: (x - inner[0] / 2 + width / 2) * px,
    y: -(y + scroll - inner[1] / 2 + height / 2) * px,
    width: width * px,
    height: height * px
  };
}
