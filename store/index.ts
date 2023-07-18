import { proxy } from "valtio";
import { derive } from "valtio/utils";

interface State {
  loaded: boolean;
  view: "grid" | "linear";
  hover: "inquire" | "partners" | "contact" | null;
  hoverProject: string | null;
  position: {
    x: number;
    y: number;
  };

  // Items
  items: any[];
  size: { width: number; height: number };
  margin: number;
  gap: number;
  n: number;

  // Derived
  speed: number;
  selected: {
    id: string;
    src: string;
    size: {
      width: number;
      height: number;
    };
  } | null;
  selectedIndex: number;
  pages: number;
}

const state = proxy({
  loaded: false,
  view: "linear",
  hover: null,
  hoverProject: null,
  position: {
    x: 0,
    y: 0,
  },

  items: [],
  mapItems: [],
  size: { width: 1.5, height: 1.5 },
  margin: 0.15,
  gap: 0.1,
  n: 3,

  speed: 0,
  selected: null,
  selectedIndex: -1,
  pages: 3,
} as State);

const derived = derive({
  hello: (get) => {
    return "world";
  },
});

export { state, derived };
