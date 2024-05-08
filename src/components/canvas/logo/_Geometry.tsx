"use client";

import { Group, Mesh, MeshBasicMaterial, ShapeGeometry } from "three";
// @ts-expect-error - Ignore import error
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadSVG: (url: string) => Promise<any>;
}

class _ extends Group {
  controller: Props;

  constructor(controller: Props) {
    super();

    this.controller = controller;
  }

  async initMesh() {
    const { loadSVG } = this.controller;

    // Fetch the SVG data from the provided URL
    const svgDataURL = "/totem.svg";
    const svgData = await fetch(svgDataURL);
    const svgText = await svgData.text();

    // Load the SVG data
    const data = await loadSVG(`data:image/svg+xml,${encodeURIComponent(svgText)}`);

    const paths = data.paths;

    const group = new Group();
    group.scale.y *= -1;
    group.scale.multiplyScalar(0.002);
    group.position.set(-2, 0, 0);

    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];

      const material = new MeshBasicMaterial();
      const shapes = SVGLoader.createShapes(path);

      for (let j = 0; j < shapes.length; j++) {
        const shape = shapes[j];
        const geometry = new ShapeGeometry(shape);
        const mesh = new Mesh(geometry, material);
        group.add(mesh);
      }
    }

    this.add(group);
  }
}

export default _;
