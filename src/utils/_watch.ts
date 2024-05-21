import Emitter from "tiny-emitter";

import { isTablet } from "./_agents";

export class Watch extends Emitter.TinyEmitter {
  el: HTMLElement;
  observerIn?: IntersectionObserver;
  observerOut?: IntersectionObserver;
  config: {
    in: {
      t: number;
      my: string;
    };
    out: {
      t: number;
      my: string;
    };
  };

  constructor(el: HTMLElement) {
    super();
    this.el = el;

    this.config = {
      in: {
        t: 0.01,
        my: "0px"
      },
      out: {
        t: 0,
        my: "0px"
      }
    };

    if (isTablet()) this.config.in.t = 0.9;

    this.setup();
    if (this.el) this.init();
  }

  init() {
    if (!this.observerIn || !this.observerOut) return;
    this.observerIn.observe(this.el);
    this.observerOut.observe(this.el);
  }

  stop() {
    if (!this.observerIn || !this.observerOut) return;
    this.observerIn.unobserve(this.el);
    this.observerOut.unobserve(this.el);
  }

  setup() {
    this.observerIn = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) this.emit("isIn");
      },
      {
        root: null,
        threshold: this.config.in.t,
        rootMargin: `${this.config.in.my}`
      }
    );

    this.observerOut = new IntersectionObserver(
      entries => {
        if (!entries[0].isIntersecting) this.emit("isOut");
      },
      {
        root: null,
        threshold: this.config.out.t,
        rootMargin: `${this.config.out.my}`
      }
    );
  }
}
