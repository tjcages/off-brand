"use client";

import { PerspectiveCamera, Vector2, Vector3 } from "three";

class _ {
  static camera: PerspectiveCamera;
  static mouse: Vector2;
  static lookAt: Vector3;
  static origin: Vector3;
  static target: Vector3;
  static targetXY: Vector2;
  static lerpSpeed: number;
  static enabled: boolean;

  static init(camera: PerspectiveCamera) {
    this.camera = camera;

    this.mouse = new Vector2();
    this.lookAt = new Vector3(0, 0, -2);
    this.origin = new Vector3();
    this.target = new Vector3();
    this.targetXY = new Vector2(5, 1);
    this.origin.copy(this.camera.position);

    this.lerpSpeed = 0.01;
    this.enabled = false;

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
    if (!this.enabled) {
      return;
    }

    this.mouse.x = ((clientX / document.documentElement.clientWidth) * 2 - 1) * 0.5;
    this.mouse.y = Math.max(0, 1 - (clientY / document.documentElement.clientHeight) * 2);
  };

  static onPointerUp = (e: { clientX: number; clientY: number }) => {
    this.onPointerMove(e);
  };

  // Public methods

  static resize = (width: number, height: number) => {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    if (width < height) {
      this.camera.position.z = 14;
    } else {
      this.camera.position.z = 10;
    }

    this.origin.z = this.camera.position.z;

    this.camera.lookAt(this.lookAt);
  };

  static update = () => {
    if (!this.enabled) {
      return;
    }

    this.target.x = this.origin.x + this.targetXY.x * this.mouse.x;
    this.target.y = this.origin.y + this.targetXY.y * this.mouse.y;
    this.target.z = this.origin.z;

    this.camera.position.lerp(this.target, this.lerpSpeed);
    this.camera.lookAt(this.lookAt);
  };

  static animateIn = () => {
    this.enabled = true;
  };
}

export default _;
