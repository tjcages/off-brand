import { Observer, Position, Watch, calcDomPosition } from "@/utils";
import { gsap } from "gsap";
import {
  createProgramInfo,
  drawBufferInfo,
  m4,
  setBuffersAndAttributes,
  setUniforms
} from "twgl.js";

import { domShaders } from "./_material";
import Quad from "./_quad";
import Texture from "./_texture";

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

export default class DomQuad extends Quad {
  private ref?: HTMLElement;
  private gridRef?: HTMLElement;
  private anim: { rand: number; inView: number; hover: number };
  private texture: Texture;
  private gridMat: m4.Mat4;
  private shaders?: string[];
  private obs?: Observer;
  private watch?: Watch;
  private animationIn?: gsap.core.Tween;
  private animationInOut?: gsap.core.Tween;

  constructor(gl: WebGLRenderingContext, ref: HTMLElement, gridRef: HTMLElement) {
    super(gl);

    this.gl = gl;
    this.ref = ref;
    this.gridRef = gridRef;

    this.anim = {
      rand: Math.random(),
      inView: 0,
      hover: 0
    };

    this.texture = new Texture(this.gl, this.ref);
    this.gridMat = m4.create();

    this.loadTexture();
    this.initDom();
  }

  private loadTexture(): void {
    this.texture.load().then(() => this.initAnimation());
  }

  public createProgram(): void {
    this.shaders = domShaders;
    this.programInfo = createProgramInfo(this.gl, this.shaders);
  }

  public resize(
    gl: WebGLRenderingContext & { vp?: WebGLViewport } & { camera?: CameraData }
  ): void {
    this.gl = gl;

    if (this.texture) this.texture.resize(this.gl);

    if (!this.ref || !this.gl.vp) return;
    const pos: Position = calcDomPosition(this.ref, {
      px: this.gl.vp.px || 0,
      inner: this.gl.vp.inner || [0, 0],
      scroll: this.gl.vp.scroll || 0
    });
    m4.translation([pos.x, pos.y, 0], this.mat);

    if (!this.gridRef) return;
    const gridPos: Position = calcDomPosition(this.gridRef, {
      px: this.gl.vp.px || 0,
      inner: this.gl.vp.inner || [0, 0],
      scroll: this.gl.vp.scroll || 0
    });
    m4.translation([gridPos.x, gridPos.y, 0], this.gridMat);

    if (!this.programInfo || !gl.vp || !gl.camera) return;
    this.gl.useProgram(this.programInfo.program);
    setUniforms(this.programInfo, {
      u_res: [gl.canvas.width, gl.canvas.height],
      u_vs: gl.vp.viewSize,
      u_id: this.mat,
      u_camera: gl.camera.mat,
      u_scale: [pos.width, pos.height],
      u_gridScale: [gridPos.width, gridPos.height]
    });
  }

  public render(t: number, y: number, { grid }: { grid: number }): void {
    if (this.texture) this.texture.render();

    if (!this.programInfo || !this.bufferInfo) return;
    this.gl.useProgram(this.programInfo.program);
    setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);
    setUniforms(this.programInfo, {
      u_time: t,
      u_id: this.mat,
      u_y: y,
      u_diff: this.texture.texture,
      u_ratio: this.texture.ratio,
      u_inView: this.anim.inView,
      u_hover: this.anim.hover,
      u_gridId: this.gridMat,
      u_TOGRID: grid
    });

    drawBufferInfo(this.gl, this.bufferInfo);
  }

  private initDom(): void {
    if (!this.ref) return;
    this.obs = new Observer(this.ref);
    this.obs.on("in", () => this.animateIn());
    this.obs.on("out", () => this.animateOut());

    this.ref.onmouseover = () => this.animateMouseIn();
    this.ref.onmouseleave = () => this.animateMouseOut();
    if (!this.gridRef) return;
    this.gridRef.onmouseover = () => this.animateMouseIn();
    this.gridRef.onmouseleave = () => this.animateMouseOut();
  }

  private initAnimation(): void {
    if (!this.ref) return;
    this.watch = new Watch(this.ref);
    this.watch.on("isIn", () => this.animateIn());
    this.watch.on("isOut", () => this.setOut());

    this.resize(this.gl);
  }

  private animateIn(): void {
    this.animationIn = gsap.to(this.anim, {
      inView: 1,
      duration: 1.2,
      ease: "expo",
      delay: this.anim.rand * 0.3
    });
  }

  private animateOut(): void {
    if (this.animationIn) this.animationIn.kill();
    this.anim.inView = 0;
  }

  private animateMouseIn(): void {
    gsap.to(this.anim, {
      hover: 1,
      ease: "expo.out",
      duration: 0.8
    });
  }

  private animateMouseOut(): void {
    gsap.to(this.anim, {
      hover: 0,
      ease: "expo.out",
      duration: 0.8
    });
  }

  private setOut(): void {
    if (this.animationInOut) this.animationInOut.kill();
    this.anim.inView = 0;
  }
}
