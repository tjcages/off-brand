import { gsap } from "gsap";

import DomQuad from "./_modules";

export default class Scene {
  private gl: WebGLRenderingContext;
  private ui: { isGrid: boolean; grid: number };
  private gridQuadRefs?: HTMLElement[];
  private quadRefs?: HTMLElement[];
  private quads?: DomQuad[];
  private gridDom?: HTMLElement | null;

  constructor(gl: WebGLRenderingContext) {
    this.gl = gl;

    this.ui = {
      isGrid: true,
      grid: 1
    };

    this.create();
    this.initUI();
  }

  create(): void {
    this.gridQuadRefs = Array.from(document.querySelectorAll("[data-quad-grid]"));
    this.quadRefs = Array.from(document.querySelectorAll("[data-quad]"));
    this.quads = this.quadRefs.map(
      (quad, i) =>
        new DomQuad(this.gl, quad as HTMLElement, this.gridQuadRefs?.[i] as HTMLElement, i)
    );
  }

  render(t: number, y: number): void {
    if (this.quads) this.quads.forEach(quad => quad.render(t, y, { grid: this.ui.grid }));
  }

  resize(gl: WebGLRenderingContext): void {
    this.gl = gl;
    if (this.quads) this.quads.forEach(quad => quad.resize(this.gl));
  }

  /**
   * UI ops
   */

  initUI(): void {
    const gridButton = document.querySelector('[data-ui="grid"]');
    this.gridDom = document.querySelector(".grid-w");

    if (gridButton) {
      gridButton.addEventListener("click", () => {
        const val = this.ui.isGrid ? 0 : 1;
        // this.ui.isGrid ? this.displayScrollUi(true) : this.displayScrollUi(false);
        this.ui.isGrid = !this.ui.isGrid;

        gsap.to(this.ui, {
          grid: val,
          duration: 1,
          ease: "expo"
        });
      });
    }
  }

  displayScrollUi(bool: boolean): void {
    if (bool) {
      if (this.quadRefs) this.quadRefs.forEach(ref => (ref.style.pointerEvents = "none"));
      if (this.gridQuadRefs) this.gridQuadRefs.forEach(ref => (ref.style.pointerEvents = "auto"));
      if (this.gridDom) {
        this.gridDom.style.zIndex = "1";
      }
    } else {
      if (this.quadRefs) this.quadRefs.forEach(ref => (ref.style.pointerEvents = "auto"));
      if (this.gridQuadRefs) this.gridQuadRefs.forEach(ref => (ref.style.pointerEvents = "none"));
      if (this.gridDom) {
        this.gridDom.style.zIndex = "-1";
      }
    }
  }
}
