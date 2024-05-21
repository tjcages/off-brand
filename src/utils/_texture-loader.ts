/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTexture } from "twgl.js";

/**
 * Load Texture
 */
export function loadTexture(gl: WebGLRenderingContext, src: any, filtering: any) {
  const filter = filtering || gl.NEAREST;

  return createTexture(gl, {
    src: src,
    mag: filter
  });
}

/**
 * Add + Attached Data
 */
export function loadTextureAndData(gl: WebGLRenderingContext, src: any, filtering: any) {
  const ratio = calcRatio(src);
  const filter = filtering || gl.NEAREST;

  // setup promise
  const texture = createTexture(gl, {
    src: src,
    mag: filter
  });

  return { texture, ratio };
}

/**
 * -------- CalcRatio
 */

export function calcRatio(
  src: { parentElement: any; naturalWidth: any; naturalHeight: any },
  wrap = null
) {
  const wrapper = wrap || src.parentElement;

  // calc wrapper
  const wrapWidth = wrapper.clientWidth;
  const wrapHeight = wrapper.clientHeight;
  const wrapHorizontal = wrapWidth > wrapHeight; // true = ho, false = vertical
  const wrapRatio = wrapWidth / wrapHeight;
  const wrapRevRatio = wrapHeight / wrapWidth;

  // calc image
  const imgWidth = src.naturalWidth;
  const imgHeight = src.naturalHeight;
  const imgHorizontal = imgWidth > imgHeight; // true = ho, false = vertical
  const imgRatio = imgWidth / imgHeight;
  const imgRevRatio = imgHeight / imgWidth;

  /** Cases */

  // 1. vertical wrap w vertical image -> (false, false)
  if (!wrapHorizontal && !imgHorizontal) {
    // console.log("case1: v v");
    return [1 * wrapRatio, imgRatio];
  }

  // 2. vertical wrap w horizontal image -> (false, true)
  if (!wrapHorizontal && imgHorizontal) {
    // console.log("case2: v h");
    return [imgRevRatio * wrapRatio, 1];
  }

  // 3. horizontal wrap w vertical image -> (true, false)
  if (wrapHorizontal && !imgHorizontal) {
    // console.log("case3: h v");
    return [imgRevRatio, 1 * wrapRevRatio];
  }

  // 4. horizontal wrap w horizontal image -> (true, true)
  if (wrapHorizontal && imgHorizontal) {
    // console.log("case4: h h");
    return [imgRevRatio, 1 * wrapRevRatio];
  }

  return [1, 1];
}
