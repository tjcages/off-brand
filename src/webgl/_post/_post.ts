import Quad from "./_quad";

export default class Post {
  private gl: WebGLRenderingContext;
  private fbi: WebGLFramebuffer | null;
  private texture: WebGLTexture | null;
  private depthBuffer: WebGLRenderbuffer | null;
  private quad: Quad | null;
  public isActive: boolean;

  constructor(gl: WebGLRenderingContext) {
    this.gl = gl;
    this.fbi = null;
    this.texture = null;
    this.depthBuffer = null;
    this.quad = null;
    this.isActive = false;
  }

  create(): void {
    // CREATE FRAMEBUFFER
    this.fbi = this.gl.createFramebuffer();

    // CREATE TEXTURE
    this.texture = this.gl.createTexture();
    if (this.texture) {
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
      this.gl.texImage2D(
        this.gl.TEXTURE_2D,
        0,
        this.gl.RGBA,
        this.gl.canvas.width,
        this.gl.canvas.height,
        0,
        this.gl.RGBA,
        this.gl.UNSIGNED_BYTE,
        null
      );

      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    }

    // CREATE RENDER BUFFER
    this.depthBuffer = this.gl.createRenderbuffer();
    if (this.depthBuffer) {
      this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthBuffer);
      this.gl.renderbufferStorage(
        this.gl.RENDERBUFFER,
        this.gl.DEPTH_COMPONENT16,
        this.gl.canvas.width,
        this.gl.canvas.height
      );
    }

    this.attach();
    this.createPlane();
    this.unbind();
  }

  /**
   * FBO ops
   */

  attach(): void {
    if (this.fbi && this.texture && this.depthBuffer) {
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbi);

      this.gl.framebufferTexture2D(
        this.gl.FRAMEBUFFER,
        this.gl.COLOR_ATTACHMENT0,
        this.gl.TEXTURE_2D,
        this.texture,
        0
      );

      this.gl.framebufferRenderbuffer(
        this.gl.FRAMEBUFFER,
        this.gl.DEPTH_ATTACHMENT,
        this.gl.RENDERBUFFER,
        this.depthBuffer
      );
    }
  }

  unbind(): void {
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
  }

  /**
   * Geometry ops
   */

  createPlane(): void {
    this.quad = new Quad(this.gl);
  }

  /**
   * Render Ops
   */

  setupRender(): void {
    if (!this.isActive) return;
    if (this.fbi) {
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbi);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT || this.gl.DEPTH_BUFFER_BIT);
    }
  }

  render(t: number): void {
    if (!this.isActive || !this.quad) return;
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    this.quad.render(t, this.texture);
  }

  resize(gl: WebGLRenderingContext): void {
    this.gl = gl;
    this.create();
    if (this.quad) this.quad.resize(this.gl);
  }
}
