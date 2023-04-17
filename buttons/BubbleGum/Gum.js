import gsap from "gsap";

export default class Animation {
  cols = 16;
  rows = 9;

  circleSize = 30;
  scaleMin = 0.15;
  scaleMax = 1.5;
  range = 175;

  spacingHorizontal = 60;
  spacingVertical = 80;
  fill = "#CA75E6";

  svgMargin = 40;
  svgHeight = 0;
  svgWidth = 0;

  circles = [];
  screen = {
    width: 400,
    height: 400,
  };
  mouse = {
    x: 400 / 2,
    y: 400 / 2,
  };
  mouseStored = Object.assign({}, this.mouse);

  constructor(selector) {
    this.svg = document.getElementById("animation");
    this.g = this.svg.getElementById("g");

    this.svgWidth =
      this.cols * this.circleSize +
      2 * this.svgMargin +
      (this.cols - 1) * this.spacingHorizontal;
    this.svgHeight =
      this.rows + 2 * this.svgMargin + (this.rows - 1) * this.spacingVertical;

    this.svg.setAttribute("viewBox", `0 0 ${this.svgWidth} ${this.svgHeight}`);

    this.addEventListeners();
    // Draw all the circles
    this.draw();
    // And animate them if the user is fine with it
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches
      ? this.animate()
      : null;
  }

  addEventListeners() {
    let self = this;
    // Don't redraw everything, only recalculate the centers of all arrows
    window.addEventListener("resize", function () {
      self.screen.width = window.innerWidth;
      self.screen.height = window.innerHeight;
      self.setCircleCenters();
    });
  }

  draw() {
    for (var i = 0; i < this.rows; i++) {
      const offset = i % 2;
      for (var j = 0; j < this.cols + 2 * offset; j++) {
        // We're drawing the initial lines horizontally
        let c = new Circle(
          this.svgMargin +
            j * this.circleSize +
            j * this.spacingHorizontal -
            (offset * (this.spacingHorizontal + this.circleSize)) / 2,
          this.svgMargin + i * this.spacingVertical,
          this.circleSize,
          this.fill
        );

        // Set a transform origin and add the HTML element to the SVG
        const cElement = c.getElement();
        gsap.set(cElement, { transformOrigin: "50% 50%" });
        this.g.appendChild(cElement);

        this.circles.push(c);
      }
    }

    this.setCircleCenters();
  }

  clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }

  setMouseCoords(event) {
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
  }

  setCircleCenters() {
    this.circles.forEach((circle) => {
      // Get the center of the line
      // Instead of mapping svg coords to the screen position, get the position on the actual screen using boundingRect
      const boundingRect = circle.getElement().getBoundingClientRect();
      circle.center = {
        x: boundingRect.x + boundingRect.width / 2,
        y: boundingRect.y + boundingRect.height / 2,
      };
    });
  }

  animate() {
    // Listen for the mouse movements
    window.addEventListener("mousemove", this.setMouseCoords.bind(this));
    // And use the ticker to update the rotation accordingly
    gsap.ticker.add(this.setCircleScale.bind(this));
  }

  setCircleScale() {
    // Don't do anything if the cursor's position is the same as in the previous tick
    if (
      this.mouseStored.x === this.mouse.x &&
      this.mouseStored.y === this.mouse.y
    )
      return;

    this.circles.forEach((circle) => {
      // d = √[(x2 − x1)2 + (y2 − y1)2]
      const distance = Math.sqrt(
        Math.pow(circle.center.x - this.mouse.x, 2) +
          Math.pow(circle.center.y - this.mouse.y, 2)
      );
      const scale = this.range / (distance + this.circleSize);

      gsap.to(circle.getElement(), {
        scale: this.clamp(scale, this.scaleMin, this.scaleMax),
      });
    });

    // Store the mouse position for the next tick
    this.mouseStored.x = this.mouse.x;
    this.mouseStored.y = this.mouse.y;
  }
}

class Circle {
  cx = 0;
  cy = 0;
  r = 0;
  fill = "white";
  element = null;

  constructor(cx, cy, r, fill) {
    this.cx = cx;
    this.cy = cy;
    this.r = r;
    this.fill = fill;
    this.element = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    this.setElement();
  }

  getElement() {
    return this.element;
  }

  setElement(cx, cy, r, fill) {
    this.element.setAttribute("cx", cx ? cx : this.cx);
    this.element.setAttribute("cy", cy ? cy : this.cy);
    this.element.setAttribute("r", r ? r : this.r);
    this.element.setAttribute("fill", fill ? fill : this.fill);
  }
}
