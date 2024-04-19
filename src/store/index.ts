import { proxy } from "valtio";

type State = {
  // Loading
  loaded: boolean;
  ready: boolean;

  // Steps
  hoveredStep: number | null;
  selectedStep: number | null;
  sbSelectedModal?: number;
  wbSelectedModal?: number;
  edSelectedModal?: number;

  // User Controls
  hasSoundPermission?: boolean;
};

export const state = proxy({
  // Loading
  loaded: false,
  ready: false,

  hoveredStep: null,
  selectedStep: null,
  sbSelectedModal: undefined,
  wbSelectedModal: undefined,
  edSelectedModal: undefined,

  // User Controls
  hasSoundPermission: undefined
} as State);
export type { State };
