import { proxy } from "valtio";
import { derive } from "valtio/utils";

interface State {
  loaded: boolean;
  view: "grid" | "linear";
  hover: "inquire" | "partners" | "contact" | null;

  // Items
  items: any[];
  size: { width: number; height: number };
  margin: number;
  gap: number;
  n: number;

  // Derived
  speed: number;
  selected: {
    src: string;
    size: {
      width: number;
      height: number;
    };
  } | null;
  pages: number;
}

const state = proxy({
  loaded: false,
  view: "linear",
  hover: null,

  items: [],
  mapItems: [],
  size: { width: 1.5, height: 1.5 },
  margin: 0.15,
  gap: 0.1,
  n: 3,

  speed: 0,
  selected: null,
  pages: 0,
} as State);

const derived = derive({
  hello: (get) => {
    return "world";
  },
});

export { state, derived };
