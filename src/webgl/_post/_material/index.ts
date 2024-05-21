// @ts-expect-error TS2307: Cannot find module (does exist)
import frag from "./_material.frag.glsl";
// @ts-expect-error TS2307: Cannot find module (does exist)
import vert from "./_material.vert.glsl";

const Sh = [vert, frag];
export default Sh;
