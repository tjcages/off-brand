/* eslint-disable @typescript-eslint/no-explicit-any */
export class Scroll {
  gl: any;
  y: number;
  isActive: boolean;

  constructor(gl: any) {
    this.gl = gl;
    this.y = 0;
    this.isActive = this.canScroll;

    document.onscroll = () => this.onScroll();
  }

  onScroll() {
    if (!this.isActive) return;

    this.y = window.scrollY * this.gl.vp.px;
  }

  resize(gl: any) {
    this.gl = gl;
    this.isActive = this.canScroll;
    this.y = window.scrollY * this.gl.vp.px;
  }

  get canScroll() {
    return document.documentElement.scrollHeight > window.innerHeight;
  }
}
