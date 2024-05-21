import { gsap } from "gsap";
import * as twgl from "twgl.js";

import shaders from "./_material";

export default class Quad {
  private gl: WebGLRenderingContext;
  private shaders: string[];
  private programInfo: twgl.ProgramInfo;
  private mouse: { x: number; y: number };
  private bufferInfo?: twgl.BufferInfo;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private uniforms?: { u_res: number[]; u_time: number; u_diff?: any; u_mouse?: number[] };

  constructor(gl: WebGLRenderingContext) {
    this.gl = gl;
    this.shaders = shaders;
    this.programInfo = twgl.createProgramInfo(this.gl, this.shaders);

    this.mouse = {
      x: 0.5,
      y: 0.5
    };

    this.gl.useProgram(this.programInfo.program);
    this.setBuffAtt();
    this.setUniforms();

    this.initEvents();
  }

  private initEvents(): void {
    document.onmousemove = (e: MouseEvent) => this.onMouseMove(e);
  }

  private onMouseMove(e: MouseEvent): void {
    const x = e.clientX / this.gl.canvas.width;
    const y = 1 - e.clientY / this.gl.canvas.height;

    gsap.to(this.mouse, {
      x: x,
      y: y,
      duration: 0.6,
      ease: "slow.inOut"
    });
  }

  private setBuffAtt(): void {
    const arrays = {
      position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0]
    };

    this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, arrays);
  }

  private setUniforms(): void {
    this.uniforms = {
      u_res: [this.gl.canvas.width, this.gl.canvas.height],
      u_time: 0
    };

    this.gl.useProgram(this.programInfo.program);
    twgl.setUniforms(this.programInfo, this.uniforms);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public render(time: number, diff: any = null): void {
    this.gl.useProgram(this.programInfo.program);
    if (!this.bufferInfo) return;
    twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);
    twgl.setUniforms(this.programInfo, {
      u_time: time,
      u_diff: diff,
      u_mouse: [this.mouse.x, this.mouse.y]
    });

    twgl.drawBufferInfo(this.gl, this.bufferInfo);
  }

  public resize(gl: WebGLRenderingContext): void {
    this.gl = gl;

    this.gl.useProgram(this.programInfo.program);
    twgl.setUniforms(this.programInfo, {
      u_res: [this.gl.canvas.width, this.gl.canvas.height]
    });
  }
}
