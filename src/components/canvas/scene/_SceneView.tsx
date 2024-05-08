"use client";

import { Group } from "three";

import Floor from "@/components/canvas/floor";
import LogoView from "@/components/canvas/logo";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadTexture: (url: string) => Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderer: any;
  aspect: { value: number };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  camera: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  quad: any;
  getFrustum: (offsetZ?: number) => { width: number; height: number };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadSVG: (url: string) => Promise<any>;
}

class _ extends Group {
  controller: Props;
  visible: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  floor: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  triangle: any;

  constructor(controller: Props) {
    super();

    this.visible = false;
    this.controller = controller;

    this.initViews();
  }

  initViews() {
    if (!this.controller) return;
    this.floor = new Floor(this.controller);
    this.add(this.floor);

    this.triangle = new LogoView(this.controller);
    this.add(this.triangle);
  }

  // Public methods

  resize = (width: number, height: number, dpr: number) => {
    this.floor.resize(width, height);
    this.triangle.resize(width, height, dpr);
  };

  ready = () => Promise.all([this.floor.initMesh(), this.triangle.ready()]);
}

export default _;
