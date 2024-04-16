import { proxy } from "valtio";

type State = {
  // Loading
  loaded: boolean;
  ready: boolean;

  step: number | null;
  hoveredStep: number | null;
  selectedStep: number | null;
  isIntro: boolean;

  // User Controls
  hasSoundPermission?: boolean;
};

export const state = proxy({
  // Loading
  loaded: false,
  ready: false,

  step: null,
  hoveredStep: null,
  selectedStep: null,
  isIntro: true,

  // User Controls
  hasSoundPermission: undefined
} as State);
export type { State };
