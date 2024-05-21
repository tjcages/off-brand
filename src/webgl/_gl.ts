import { SmoothScroll } from "@/utils";
import { m4, resizeCanvasToDisplaySize } from "twgl.js";

import Camera from "./_camera";
import Post from "./_post";
import Scene from "./_scene";

interface WebGLViewport {
  dpr?: number;
  viewSize?: [number, number];
  px?: number;
  inner?: [number, number];
  scroll?: number;
}

interface CameraData {
  z: number;
  fov: number;
  near: number;
  far: number;
  mat?: m4.Mat4;
}

export default class GL {
  private canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext & { vp?: WebGLViewport } & { camera?: CameraData };
  private camera: Camera;
  private post?: Post & { isActive?: boolean };
  private scene?: Scene;
  private scroll: SmoothScroll;
  private time: number;

  constructor() {
    this.canvas = document.getElementById("c") as HTMLCanvasElement;
    this.gl = this.canvas.getContext("webgl") as WebGLRenderingContext;
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.vp = { dpr: Math.min(window.devicePixelRatio, 2) };

    this.camera = new Camera(this.gl);
    this.gl.camera = this.camera.get(this.gl);

    new ResizeObserver(() => this.resize()).observe(this.canvas);
    this.resize();

    this.scroll = new SmoothScroll();
    this.time = 0;

    this.create();

    this.render();
    this.resize();
  }

  create(): void {
    this.post = new Post(this.gl);
    this.post.isActive = true;
    this.scene = new Scene(this.gl);
  }

  render(): void {
    this.time += 0.01;

    this.gl.clear(this.gl.COLOR_BUFFER_BIT || this.gl.DEPTH_BUFFER_BIT);
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    if (this.post && this.post.isActive) this.post.setupRender();
    if (this.scene && this.gl.vp)
      this.scene.render(this.time, this.scroll.y.current * (this.gl.vp.px || 1));

    if (this.post && this.post.isActive) this.post.render(this.time);

    requestAnimationFrame(() => this.render());
  }

  resize(): void {
    if (!this.gl.vp) return;
    resizeCanvasToDisplaySize(this.gl.canvas as HTMLCanvasElement, this.gl.vp.dpr);

    let scrollCurrent = window.scrollY;
    if (this.scroll && this.scroll.y) scrollCurrent = this.scroll.y.current;

    // viewport data
    this.gl.vp = {
      viewSize: this.viewSize,
      px: this.pixelSize,
      inner: [window.innerWidth, window.innerHeight],
      scroll: scrollCurrent
    };

    this.gl.camera = this.camera.get(this.gl);

    // resize scene

    if (this.scene) this.scene.resize(this.gl);
    if (this.post) this.post.resize(this.gl);
  }

  /**
   * ----- Utils
   */

  get viewSize(): [number, number] {
    if (!this.gl.camera) return [0, 0];
    const height = Math.abs(this.gl.camera.z * Math.tan(this.gl.camera.fov / 2) * 2);
    return [height * (this.gl.canvas.width / this.gl.canvas.height), height];
  }

  get pixelSize(): number {
    return this.viewSize[0] / window.innerWidth;
  }
}
