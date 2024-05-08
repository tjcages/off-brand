"use client";

import { Camera, MathUtils, Vector2, Vector3 } from "three";

interface Props {
  visible: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  triangle: any;
  resize: (width: number, height: number, dpr: number) => void;
  ready: () => void;
}

class _ {
  static camera: Camera;
  static view: Props;
  static width: number;
  static height: number;
  static lastMouse: Vector2 & { isInit?: boolean };
  static triangleWorldPosition: Vector3;
  static screenSpacePosition: Vector3;

  static init(camera: Camera, view: Props) {
    this.camera = camera;
    this.view = view;

    // Fluid simulation
    this.lastMouse = new Vector2();

    this.triangleWorldPosition = new Vector3();
    this.screenSpacePosition = new Vector3();

    this.addListeners();
  }

  static addListeners() {
    window.addEventListener("pointerdown", this.onPointerDown);
    window.addEventListener("pointermove", this.onPointerMove);
    window.addEventListener("pointerup", this.onPointerUp);
  }

  // Event handlers

  static onPointerDown = (e: { clientX: number; clientY: number }) => {
    this.onPointerMove(e);
  };

  static onPointerMove = ({ clientX, clientY }: { clientX: number; clientY: number }) => {
    if (!this.view.visible) {
      return;
    }

    const event = {
      x: clientX,
      y: clientY
    };

    // Adjust for triangle screen space
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;
    const triangleWidth = Math.round(this.width * this.view.triangle.widthResolutionScale);
    const triangleHeight = Math.round(this.height * this.view.triangle.heightResolutionScale);
    const triangleHalfWidth = triangleWidth / 2;
    const triangleHalfHeight = triangleHeight / 2;

    this.triangleWorldPosition.setFromMatrixPosition(this.view.triangle.mesh.matrixWorld);
    this.screenSpacePosition.copy(this.triangleWorldPosition).project(this.camera);

    this.screenSpacePosition.x =
      this.screenSpacePosition.x * halfWidth + halfWidth - triangleHalfWidth;
    this.screenSpacePosition.y =
      -(this.screenSpacePosition.y * halfHeight) + halfHeight - triangleHalfHeight;

    // First input
    if (!this.lastMouse.isInit) {
      this.lastMouse.isInit = true;
      this.lastMouse.copy(new Vector2(event.x, event.y));
    }

    const deltaX = event.x - this.lastMouse.x;
    const deltaY = event.y - this.lastMouse.y;

    this.lastMouse.copy(new Vector2(event.x, event.y));

    // Add if the mouse is moving
    if (Math.abs(deltaX) || Math.abs(deltaY)) {
      // Update fluid simulation inputs
      this.view.triangle.fluid.splats.push({
        // Get mouse value in 0 to 1 range, with Y flipped
        x: MathUtils.mapLinear(
          event.x,
          this.screenSpacePosition.x,
          this.screenSpacePosition.x + triangleWidth,
          0,
          1
        ),
        y:
          1 -
          MathUtils.mapLinear(
            event.y,
            this.screenSpacePosition.y,
            this.screenSpacePosition.y + triangleHeight,
            0,
            1
          ),
        dx: deltaX * 5,
        dy: deltaY * -5
      });
    }
  };

  static onPointerUp = (e: { clientX: number; clientY: number }) => {
    this.onPointerMove(e);
  };

  // Public methods

  static resize = (width: number, height: number, dpr: number) => {
    this.width = width;
    this.height = height;

    this.view.resize(width, height, dpr);
  };

  static update = () => {
    // Perform all of the fluid simulation renders
    this.view.triangle.fluid.update();
  };

  static animateIn = () => {
    this.view.visible = true;
  };

  static ready = () => this.view.ready();
}

export default _;
