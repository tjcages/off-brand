import {
  BufferInfo,
  ProgramInfo,
  createProgramInfo,
  drawBufferInfo,
  m4,
  primitives,
  setBuffersAndAttributes,
  setUniforms
} from "twgl.js";

import { cameraShaders } from "./_material";

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

export default class Quad {
  gl: WebGLRenderingContext & { vp?: WebGLViewport } & { camera?: CameraData };
  private data: { x: number; y: number; z: number; rand?: number };
  mat: m4.Mat4;
  programInfo?: ProgramInfo;
  bufferInfo?: BufferInfo;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private uniforms: any;

  constructor(
    gl: WebGLRenderingContext,
    data: { x: number; y: number; z: number; rand?: number } = {
      x: 0,
      y: 0,
      z: 0
    }
  ) {
    this.gl = gl;
    this.data = data;
    this.createProgram();

    this.mat = m4.create();
    m4.translation([this.data.x, this.data.y, this.data.z], this.mat);

    if (!this.programInfo) return;
    this.gl.useProgram(this.programInfo.program);
    this.setBuffAtt();
    this.setUniforms();
  }

  public createProgram(): void {
    this.programInfo = createProgramInfo(this.gl, cameraShaders);
  }

  setBuffAtt(): void {
    this.bufferInfo = primitives.createPlaneBufferInfo(
      this.gl,
      1, // width
      1, // height
      100, // subdx
      100, // subdy
      m4.rotationX(Math.PI / 2)
    );

    if (!this.programInfo) return;
    setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);
  }

  setProgram(val?: string[]): string[] {
    return val || cameraShaders;
  }

  setUniforms(): void {
    if (!this.gl.vp || !this.gl.camera) return;
    this.uniforms = {
      u_res: [this.gl.canvas.width, this.gl.canvas.height],
      u_vs: this.gl.vp.viewSize,
      u_camera: this.gl.camera.mat,
      u_id: this.mat,
      rand: this.data.rand
    };

    if (!this.programInfo) return;
    this.gl.useProgram(this.programInfo.program);
    setUniforms(this.programInfo, this.uniforms);
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  public render(t: number, y: number, { grid }: { grid: number }): void {
    if (!this.programInfo || !this.bufferInfo) return;
    this.gl.useProgram(this.programInfo.program);
    setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);
    setUniforms(this.programInfo, {
      u_time: t
      //u_diff: this.texture // Uncomment if texture loading is re-enabled
    });

    drawBufferInfo(this.gl, this.bufferInfo);
  }

  resize(gl: WebGLRenderingContext & { vp?: WebGLViewport } & { camera?: CameraData }): void {
    this.gl = gl;

    if (!this.programInfo) return;
    this.gl.useProgram(this.programInfo.program);
    if (!gl.vp || !gl.camera) return;
    setUniforms(this.programInfo, {
      u_res: [gl.canvas.width, gl.canvas.height],
      u_vs: gl.vp.viewSize,
      u_id: this.mat,
      u_camera: gl.camera.mat
    });
  }
}
