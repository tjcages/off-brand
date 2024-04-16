import { proxy } from "valtio";

type State = {
  ready: boolean;
  step: number | null;
  hoveredStep: number | null;
  selectedStep: number | null;
  isIntro: boolean;

  // User Controls
  hasSoundPermission?: boolean;
};

export const state = proxy({
  ready: false,
  step: null,
  hoveredStep: null,
  selectedStep: null,
  isIntro: true,

  // User Controls
  hasSoundPermission: undefined,
} as State);
export type { State };
