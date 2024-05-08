"use client";

// @ts-expect-error - Ignore import error
import { ticker } from "@alienkitty/space.js/src/tween/Ticker.js";

import CameraController from "./camera";
import RenderManager from "./render";
import { SceneController, SceneView } from "./scene";
import WorldController from "./world";

class Canvas {
  static view: SceneView;

  constructor() {
    Canvas.init();
  }

  static async init() {
    this.initWorld();
    this.initViews();
    this.initControllers();

    this.addListeners();
    this.onResize();

    SceneController.ready();

    CameraController.animateIn();
    SceneController.animateIn();
  }

  static initWorld() {
    WorldController.init();
    // document.body.appendChild(WorldController.element);
  }

  static initViews() {
    this.view = new SceneView({
      loadTexture: WorldController.loadTexture,
      renderer: WorldController.renderer,
      aspect: WorldController.aspect,
      camera: WorldController.camera,
      quad: WorldController.quad,
      getFrustum: WorldController.getFrustum,
      loadSVG: WorldController.loadSVG
    });
    WorldController.scene.add(this.view);
  }

  static initControllers() {
    const { renderer, scene, camera } = WorldController;

    CameraController.init(camera);
    SceneController.init(camera, this.view);
    RenderManager.init(renderer, scene, camera);
  }

  static addListeners() {
    window.addEventListener("resize", this.onResize);
    ticker.add(this.onUpdate);
    ticker.start();
  }

  // Event handlers
  static onResize = () => {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    const dpr = window.devicePixelRatio * 1.5; // smoover

    WorldController.resize(width, height, dpr);
    CameraController.resize(width, height);
    SceneController.resize(width, height, dpr);
    RenderManager.resize(width, height, dpr);
  };

  static onUpdate = (time: number, delta: number, frame: number) => {
    WorldController.update(time, delta, frame);
    CameraController.update();
    SceneController.update();
    RenderManager.update();
  };
}

const _ = () => {
  new Canvas();
  return <canvas id="canvas" className="fixed top-0 right-0 left-0 bottom-0 w-full h-full" />;
};

export default _;
