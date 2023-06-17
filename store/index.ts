import { createRef } from "react";
import * as THREE from "three";
import { proxy } from "valtio";
import { derive } from "valtio/utils";

interface State {
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
  view: "grid" | "linear";

  // Items
  items: any[];
  itemsCopy: any[];
  mapItems: any[];
}

const state = proxy({
  // Camera
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
    gridMin: 1,
    linear: 1,
  },
  // Refs
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
  view: "grid",

  // Items
  items: [],
  itemsCopy: [],
  mapItems: [],
} as State);

const derived = derive({
  welcome: (get) => {
    return "Hello world";
  },
  panLimits: (get) => {
    return get(state).view == "grid"
      ? state.panLimitsGrid
      : state.panLimitsLinear;
  },
});

export { state, derived };
