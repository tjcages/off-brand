"use client";

import {
  Fluid // @ts-expect-error - Ignore import error
} from "@alienkitty/alien.js/src/three";
import { Group, Mesh, OrthographicCamera, Scene, WebGLRenderTarget } from "three";

import Logo from "./_Logo";
import Material from "./_Material";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderer: any;
  aspect: { value: number };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  camera: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  quad: any;
}

class LogoView extends Group {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  controller: any;
  width: number;
  height: number;
  isLoaded: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderer: any;
  scene?: Scene;
  camera?: OrthographicCamera;
  renderTarget?: WebGLRenderTarget;
  fluid?: Fluid;
  widthResolutionScale?: number;
  heightResolutionScale?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mesh: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logo: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sig: any;

  constructor(controller: Props) {
    super();

    this.width = 12;
    this.height = 8;
    this.isLoaded = false;
    this.controller = controller;

    this.initRenderer();
    this.initMesh();
    this.initViews();
  }

  initRenderer() {
    const { renderer, aspect } = this.controller;

    this.renderer = renderer;

    // 2D scene
    this.scene = new Scene();
    this.camera = new OrthographicCamera(
      -this.width / 2,
      this.width / 2,
      this.height / 2,
      -this.height / 2,
      0,
      1
    );

    // Render targets
    this.renderTarget = new WebGLRenderTarget(1, 1, {
      depthBuffer: false
    });

    // Fluid simulation
    this.fluid = new Fluid(this.renderer, {
      iterations: 10,
      curlStrength: 40,
      pressureDissipation: 0.5,
      velocityDissipation: 0.85,
      densityDissipation: 0.97,
      radius: 0.1
    });
    this.fluid.splatMaterial.uniforms.uAspect = aspect;
  }

  initMesh() {
    const { camera, quad } = this.controller;

    const material = new Material();
    material.uniforms.tMap.value = this.renderTarget?.texture;
    material.uniforms.tFluid = this.fluid.uniform;

    const mesh = new Mesh(quad, material);
    mesh.position.set(0, 0.9, 0);
    mesh.scale.set(this.width, this.height, 1);
    mesh.lookAt(camera.position);
    mesh.renderOrder = 1; // Render last

    this.add(mesh);

    this.mesh = mesh;
  }

  initViews() {
    this.sig = new Logo(this.controller, "/totem-sig.svg", {
      color: "red"
    });
    this.sig.scale.multiplyScalar(0.85);
    this.sig.position.set(0.75, 0.4, -1);
    if (this.scene) this.scene.add(this.sig);

    this.logo = new Logo(this.controller, "/totem.svg");
    // Reduce size to make room for fluid dissipation
    this.logo.scale.multiplyScalar(0.8);
    if (this.scene) this.scene.add(this.logo);
  }

  // Public methods

  resize = (width: number, height: number, dpr: number) => {
    const frustum = this.controller.getFrustum(this.mesh.position.z);

    this.widthResolutionScale = this.width / frustum.width;
    this.heightResolutionScale = this.height / frustum.height;

    width = Math.round(width * dpr * this.widthResolutionScale);
    height = Math.round(height * dpr * this.heightResolutionScale);

    if (this.renderTarget) this.renderTarget.setSize(width, height);
    if (this.isLoaded) this.update();
  };

  update = () => {
    // Render a single frame for the logo texture
    const currentRenderTarget = this.renderer.getRenderTarget();

    // Scene pass
    this.renderer.setRenderTarget(this.renderTarget);
    this.renderer.render(this.scene, this.camera);

    // Restore renderer settings
    this.renderer.setRenderTarget(currentRenderTarget);
  };

  ready = async () => {
    await this.logo.initMesh();
    await this.sig.initMesh();

    this.isLoaded = true;

    this.update();
  };
}

export default LogoView;
