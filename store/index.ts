import { createRef } from "react";
import * as THREE from "three";
import { proxy } from "valtio";
import { derive } from "valtio/utils";

interface State {
  // Camera
  panLimitsGrid: {
    min: THREE.Vector3;
    max: THREE.Vector3;
  };
  panLimitsLinear: {
    min: THREE.Vector3;
    max: THREE.Vector3;
  };
  panMargin: number;
  zoom: {
    grid: number;
    gridMin: number;
    linear: number;
  };

  // Refs
  camBox: {
    width: number;
    height: number;
  };
  mapRef: React.RefObject<HTMLDivElement>;
  mapPosRef: React.RefObject<HTMLDivElement>;
  mapPos: {
    width: number;
    height: number;
    top: number;
    left: number;
  };
  map: {
    width: number;
    height: number;
  };
  speed: number;
  view: "intro" | "grid" | "linear";

  // Items
  items: any[];
  mapItems: any[];

  // Derived
  selected: string;
  pages: number;
}

const state = proxy({
  panLimitsGrid: {
    min: new THREE.Vector3(-10, -10, -10),
    max: new THREE.Vector3(10, 10, 10),
  },
  panLimitsLinear: {
    min: new THREE.Vector3(0, 0, 0),
    max: new THREE.Vector3(0, 0, 0),
  },
  panMargin: -2,
  zoom: {
    grid: 1.6,
    gridMin: 0.6,
    linear: 1,
  },

  camBox: {
    width: 0,
    height: 0,
  },
  mapRef: createRef(),
  mapPos: {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  },
  map: {
    width: 0,
    height: 0,
  },
  mapPosRef: createRef(),
  speed: 0,
  view: "intro",

  items: [],
  mapItems: [],

  selected: "/imgs/archives/elijah.jpg",
  pages: 0,
} as State);

const derived = derive({
  panLimits: (get) => {
    return get(state).view == "grid"
      ? state.panLimitsGrid
      : state.panLimitsLinear;
  },
  scrollHeight: (get) => {
    return get(state)
      .items.map((i) => i.height)
      .reduce((a, b) => a + b, 0);
  },
});

/**
 * TODO: add persistent state to local storage
 * https://github.com/pmndrs/valtio/blob/main/docs/how-tos/how-to-persist-states.mdx
 * eventually send to server
 */

export { state, derived };
