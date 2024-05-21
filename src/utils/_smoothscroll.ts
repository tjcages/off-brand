import normalizeWheel from "normalize-wheel";
import Prefix from "prefix";

import { clamp, lerp, map } from "./_math";

/**
 * @param {object} [parameters]
 * @param {string} [wrapper=['data-scroll']] Scrollable element
 * @param {number} [factor=1] Scroll power parameter
 * @param {boolean} [mouse=false] Scroll on mouse drag
 * @param {boolean} [speed=false] Calculates the speed of the scroll (accessed using - this.scroll.speed)
 * @param {boolean} [percentage=false] Calculates 0 to 1 percentage of scrolling page height
 * @param {boolean} [events=false] Emit Events - WIP (no events emitted currently)
 */

interface Props {
  wrapper: string;
  factor: number;
  mouse: boolean;
  speed: boolean;
  percentage: boolean;
  events: boolean;
}

export class SmoothScroll {
  wrapper: HTMLElement | null;
  factor: number;
  mouseDrive: boolean;
  shouldGetSpeed: boolean;
  shouldGetPercentage: boolean;
  shouldEmitEvents: boolean;
  position: number;
  y: {
    current: number;
    target: number;
    last: number;
    limit: number;
  };
  speed: number;
  percentage: number;
  transformPrefix: string;
  shouldScroll?: boolean;
  touch?: {
    isDown: boolean;
    down: number;
    factor: number;
  };
  mouse?: {
    isDown: boolean;
    down: number;
    factor: number;
  };

  constructor(config?: Props) {
    // 1. config
    const { wrapper, factor, mouse, speed, percentage, events } = config || {
      wrapper: "[data-scroll]",
      factor: 0.5,
      mouse: true,
      speed: true,
      percentage: true,
      events: false
    };

    this.wrapper = document.querySelector(wrapper);
    this.factor = factor;
    this.mouseDrive = mouse;
    this.shouldGetSpeed = speed;
    this.shouldGetPercentage = percentage;
    this.shouldEmitEvents = events;

    // 2. setup
    this.changeCss();
    this.position = 0;
    this.y = {
      current: 0,
      target: 0,
      last: 0,
      limit: 500
    };
    this.speed = 0;
    this.percentage = 0;

    // 3. utils
    this.transformPrefix = Prefix("transform");
    if (this.wrapper)
      new ResizeObserver(entry => this.onResize(entry[0].contentRect)).observe(this.wrapper);

    // 4. start
    this.init();
  }

  /**
   * Init and Destroy, Start and Stop
   */

  init() {
    // wheel
    document.addEventListener("wheel", this.handleWheel.bind(this));

    if ("ontouchmove" in window) {
      this.touch = {
        isDown: false,
        down: 0,
        factor: this.factor * 0.2
      };

      window.addEventListener("touchstart", this.touchDown.bind(this));
      window.addEventListener("touchmove", this.touchMove.bind(this));
      window.addEventListener("touchend", this.touchUp.bind(this));
    } else if (this.mouseDrive) this.initMouse();

    this.start();
  }

  initMouse() {
    this.mouse = {
      isDown: false,
      down: 0,
      factor: this.factor * 3
    };

    window.addEventListener("mousedown", this.mouseDown.bind(this));
    window.addEventListener("mousemove", this.mouseMove.bind(this));
    window.addEventListener("mouseup", this.mouseUp.bind(this));
    window.addEventListener("mouseout", this.mouseUp.bind(this));
  }

  destroy() {
    document.removeEventListener("wheel", this.handleWheel.bind(this));
    if (this.mouseDrive) this.destroyMouse();

    this.stop();
  }

  destroyMouse() {
    window.removeEventListener("mousedown", this.mouseDown.bind(this));
    window.removeEventListener("mousemove", this.mouseMove.bind(this));
    window.removeEventListener("mouseup", this.mouseUp.bind(this));
  }

  start() {
    this.shouldScroll = true;
    this.raf();
  }

  stop() {
    this.shouldScroll = false;
  }

  /**
   * Utility methods
   */

  onResize(data: { width: number; height: number }) {
    this.y.limit = data.height - window.innerHeight;
  }

  /**
   * ----------------  Wheel Events
   */

  handleWheel(e: WheelEvent) {
    const normal = normalizeWheel(e).spinY;
    this.y.target += normal * 30 * this.factor;
  }

  /**
   * ---------------- Mouse Events
   */

  mouseDown(e: MouseEvent) {
    if (e.which !== 1 || !this.mouse) return;
    this.mouse.isDown = true;
    this.mouse.down = e.pageY;
  }

  mouseUp() {
    if (!this.mouse) return;
    this.mouse.isDown = false;
  }

  mouseMove(e: MouseEvent) {
    if (!this.mouse || !this.mouse.isDown) return;
    this.y.target += -e.movementY * this.mouse.factor;
  }

  /**
   * ----------------  Touch Events
   */

  touchDown(e: TouchEvent) {
    if (!this.touch) return;
    this.touch.isDown = true;
    this.touch.down = e.touches[0].clientY;
  }

  touchUp() {
    if (!this.touch) return;
    this.touch.isDown = false;
  }

  touchMove(e: TouchEvent) {
    if (!this.touch || !this.touch.isDown) return;
    this.y.target += (this.touch.down - e.touches[0].clientY) * this.touch.factor;
  }

  /**
   * Loop!
   */

  raf() {
    if (!this.shouldScroll) return;

    this.calc();
    if (this.shouldGetSpeed) this.getSpeed();
    if (this.shouldGetPercentage) this.getPercentage();

    window.requestAnimationFrame(this.raf.bind(this));
  }

  calc() {
    if (Math.abs(this.y.target - this.y.current) < 0.1) return;

    this.y.target = clamp(0, this.y.limit, this.y.target);
    this.y.current = lerp(this.y.current, this.y.target, 0.1);
    if (this.y.target < 0.01) this.y.target = 0;

    this.move();
  }

  move() {
    if (!this.wrapper || !this.transformPrefix) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.wrapper.style[this.transformPrefix as any] = `translateY(-${this.y.current}px)`;
  }

  getSpeed() {
    const speed = this.y.current - this.y.target;
    this.speed = -map(speed, -1000, 1000, -1, 1);
  }

  getPercentage() {
    this.percentage = this.y.current / this.y.limit;
  }

  /**
   * Utils and Fallbacks
   */

  changeCss() {
    if (!this.wrapper) return;
    // this.wrapper.style.draggable = "false";

    const parent = this.wrapper.parentElement;
    if (!parent) return;
    parent.style.overflow = "hidden";
    parent.style.position = "fixed";
    parent.style.width = "100%";
    parent.style.height = "100%";
  }
}
