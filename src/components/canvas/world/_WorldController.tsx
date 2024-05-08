"use client";

import {
  Color,
  ColorManagement,
  DirectionalLight,
  Fog,
  HemisphereLight,
  LinearSRGBColorSpace,
  MathUtils,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  Texture,
  TextureLoader,
  Vector2,
  WebGLRenderer
} from "three";
// @ts-expect-error - Ignore import error
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";

function getFrustum(camera: PerspectiveCamera, offsetZ = 0) {
  const distance = camera.position.z - offsetZ;
  const fov = MathUtils.degToRad(camera.fov);
  const height = 2 * Math.tan(fov / 2) * distance;
  const width = height * camera.aspect;

  return { width, height };
}

class _ {
  static renderer: WebGLRenderer;
  static scene: Scene;
  static camera: PerspectiveCamera;
  static element: HTMLCanvasElement;
  static quad: PlaneGeometry;
  static resolution: { value: Vector2 };
  static texelSize: { value: Vector2 };
  static aspect: { value: number };
  static time: { value: number };
  static frame: { value: number };
  static textureLoader: TextureLoader;
  static svgLoader: SVGLoader;

  static init() {
    this.initWorld();
    this.initLights();
    this.initLoaders();

    this.addListeners();
  }

  static initWorld() {
    const canvas =
      document.getElementById("canvas") ||
      document.body.appendChild(document.createElement("canvas"));

    this.renderer = new WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true,
      canvas: canvas
    });

    // Disable color management
    ColorManagement.enabled = false;
    this.renderer.outputColorSpace = LinearSRGBColorSpace;

    // Output canvas
    this.element = this.renderer.domElement;

    // 3D scene
    this.scene = new Scene();
    this.scene.background = new Color(0x06020b);
    this.scene.fog = new Fog(this.scene.background, 1, 100);
    this.camera = new PerspectiveCamera(30);
    this.camera.near = 0.5;
    this.camera.far = 40;
    this.camera.position.z = 10;
    this.camera.lookAt(this.scene.position);

    // Global geometries
    this.quad = new PlaneGeometry(1, 1);

    // Global uniforms
    this.resolution = { value: new Vector2() };
    this.texelSize = { value: new Vector2() };
    this.aspect = { value: 1 };
    this.time = { value: 0 };
    this.frame = { value: 0 };
  }

  static initLights() {
    this.scene.add(new HemisphereLight(0x606060, 0x404040, 3));

    const light = new DirectionalLight(0xffffff, 2);
    light.position.set(1, 1, 1);
    this.scene.add(light);
  }

  static initLoaders() {
    this.textureLoader = new TextureLoader();
    this.svgLoader = new SVGLoader();
  }

  static addListeners() {
    this.renderer.domElement.addEventListener("touchstart", this.onTouchStart);
  }

  // Event handlers

  static onTouchStart = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  // Public methods

  static resize = (width: number, height: number, dpr: number) => {
    width = Math.round(width * dpr);
    height = Math.round(height * dpr);

    this.resolution.value.set(width, height);
    this.texelSize.value.set(1 / width, 1 / height);
    this.aspect.value = width / height;
  };

  static update = (time: number, _: number, frame: number) => {
    this.time.value = time;
    this.frame.value = frame;
  };

  // Global handlers

  static getTexture = (path: string, callback: ((data: Texture) => void) | undefined) =>
    this.textureLoader.load(path, callback);

  static loadTexture = (path: string) => this.textureLoader.loadAsync(path);

  static loadSVG = (path: string) => this.svgLoader.loadAsync(path);

  static getFrustum = (offsetZ: number | undefined) => getFrustum(this.camera, offsetZ);
}

export default _;
