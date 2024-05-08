import { proxy } from "valtio";

type State = {
  // Loading
  loaded: boolean;
  ready: boolean;

  // User Controls
  hasSoundPermission?: boolean;
  graphics: "low" | "medium" | "high";
};

export const state = proxy({
  // Loading
  loaded: false,
  ready: false,

  // User Controls
  hasSoundPermission: undefined,
  graphics: "high"
} as State);
export type { State };
