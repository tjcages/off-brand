import { getProject } from "@theatre/core";

import flyThroughState from "./_fly.json";

export const flyThroughSheet = getProject("Fly Through", { state: flyThroughState }).sheet("Scene");
