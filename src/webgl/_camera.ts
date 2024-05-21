import { m4 } from "twgl.js";

interface CameraData {
  z: number;
  fov: number;
  near: number;
  far: number;
  mat?: m4.Mat4;
}

export default class Camera {
  private camera: CameraData;

  constructor(
    gl: WebGLRenderingContext,
    data: CameraData = {
      z: -9,
      fov: 0.6, // This will be overridden in the constructor
      near: 1,
      far: 1024
    }
  ) {
    data.fov = degToRad(35);
    this.camera = data;
  }

  get(gl: WebGLRenderingContext): CameraData {
    this.camera.mat = m4.translate(
      m4.perspective(
        this.camera.fov,
        gl.canvas.width / gl.canvas.height,
        this.camera.near,
        this.camera.far
      ),
      [0, 0, this.camera.z]
    );

    return this.camera;
  }
}

function degToRad(d: number): number {
  return (d * Math.PI) / 180;
}
