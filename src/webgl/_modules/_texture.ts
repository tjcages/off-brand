import { calcRatio, loadTextureAndData } from "@/utils";
import { createTexture } from "twgl.js";

export default class Texture {
  private gl: WebGLRenderingContext;
  public texture: (WebGLTexture & { ratio?: [number, number] }) | null;
  public ratio: [number, number];
  private ref: HTMLElement;
  private src: HTMLImageElement | HTMLVideoElement;
  private video?: HTMLVideoElement;
  private isVideo: boolean = false;
  private isReady: boolean = false;

  constructor(gl: WebGLRenderingContext, ref: HTMLElement) {
    this.gl = gl;
    this.texture = null;
    this.ratio = [1, 1];

    this.ref = this.setRef(ref);
    this.src = this.ref.children[0] as HTMLImageElement | HTMLVideoElement;
  }

  /* --- utils */
  private setRef(ref: HTMLElement): HTMLElement {
    const tag = ref.children[0].tagName;

    if (tag === "VIDEO") {
      this.texture = createTexture(this.gl, {
        src: [0, 0, 0, 0],
        format: this.gl.RGBA,
        min: this.gl.LINEAR,
        wrap: this.gl.CLAMP_TO_EDGE
      });

      this.video = ref.children[0] as HTMLVideoElement;
      this.setVideoParams();
      this.isVideo = true;
    }

    return ref;
  }

  public async load(): Promise<void> {
    if (this.isVideo) {
      this.video!.addEventListener("loadeddata", () => {
        return;
      });
    } else {
      // check image loading progress
      // get texture from dom
      const loadedData = loadTextureAndData(this.gl, this.src, this.gl.NEAREST);

      this.isReady = true;
      this.texture = loadedData.texture;
      this.ratio = loadedData.ratio as [number, number];

      this.resize();
    }
  }

  /*** -- Lifecycle */

  public render(): void {
    if (!this.isVideo) return;

    if (this.video && this.video.currentTime > 0) {
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
      this.gl.texImage2D(
        this.gl.TEXTURE_2D,
        0,
        this.gl.RGBA,
        this.gl.RGBA,
        this.gl.UNSIGNED_BYTE,
        this.video
      );
    }
  }

  public resize(gl: WebGLRenderingContext = this.gl): void {
    if (!this.isReady) return;
    this.gl = gl;

    if (!this.texture) return;
    this.texture.ratio = calcRatio({
      parentElement: this.ref,
      naturalWidth: this.ratio[0],
      naturalHeight: this.ratio[1]
    }) as [number, number];
  }

  /*** -- Video Utils */
  private setVideoParams(): void {
    this.video!.muted = true;
    this.video!.loop = true;
    this.video!.playbackRate = 1;
    this.video!.playsInline = true;
    this.video!.crossOrigin = "anonymous";
    this.video!.play();
  }

  public playVideo(): void {
    if (!this.isVideo) return;
    if (this.video) this.video.play();
  }

  public stopVideo(): void {
    if (!this.isVideo) return;
    if (this.video) this.video.pause();
  }
}
