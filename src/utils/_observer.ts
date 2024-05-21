import Emitter from "tiny-emitter";

export class Observer extends Emitter.TinyEmitter {
  el: HTMLElement;
  observerIn?: IntersectionObserver;
  observerOut?: IntersectionObserver;

  constructor(el: HTMLElement) {
    super();

    this.el = el;
    this.setup();

    if (!this.observerIn || !this.observerOut) return;
    this.observerIn.observe(this.el);
    this.observerOut.observe(this.el);
  }

  setup() {
    this.observerIn = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) this.emit("in");
        });
      },
      {
        root: null,
        threshold: 0.7,
        rootMargin: "0% 0% 0% 0%"
      }
    );

    this.observerOut = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) this.emit("out");
        });
      },
      {
        root: null,
        threshold: 0.0,
        rootMargin: "0% 0% 0% 0%"
      }
    );
  }
}
