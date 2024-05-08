"use client";

import {
  BloomCompositeMaterial,
  LuminosityMaterial,
  SceneCompositeDistortionMaterial,
  UnrealBloomBlurMaterial // @ts-expect-error - Ignore import error
} from "@alienkitty/alien.js/src/three";
import {
  BufferGeometry,
  Camera,
  Float32BufferAttribute,
  MathUtils,
  Mesh,
  OrthographicCamera,
  Scene,
  Vector2,
  WebGLRenderTarget,
  WebGLRenderer
} from "three";

const BlurDirectionX = new Vector2(1, 0);
const BlurDirectionY = new Vector2(0, 1);

function getFullscreenTriangle() {
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3));
  geometry.setAttribute("uv", new Float32BufferAttribute([0, 2, 0, 0, 2, 0], 2));

  return geometry;
}

class _ {
  static renderer: WebGLRenderer;
  static scene: Scene;
  static camera: Camera;
  static screenCamera: OrthographicCamera;
  static screen: Mesh;
  static renderTarget: WebGLRenderTarget;
  static renderTargetBright: WebGLRenderTarget;
  static renderTargetsHorizontal: WebGLRenderTarget[];
  static renderTargetsVertical: WebGLRenderTarget[];
  static nMips: number;
  static luminosityThreshold: number;
  static luminositySmoothing: number;
  static bloomStrength: number;
  static bloomRadius: number;
  static bloomDistortion: number;
  static enabled: boolean;
  static luminosityMaterial: LuminosityMaterial;
  static blurMaterials: UnrealBloomBlurMaterial[];
  static bloomCompositeMaterial: BloomCompositeMaterial;
  static compositeMaterial: SceneCompositeDistortionMaterial;
  static screenTriangle: BufferGeometry;

  static init(renderer: WebGLRenderer, scene: Scene, camera: Camera) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;

    // Bloom
    this.luminosityThreshold = 0.1;
    this.luminositySmoothing = 1;
    this.bloomStrength = 0.3;
    this.bloomRadius = 0.2;
    this.bloomDistortion = 3;

    this.enabled = true;

    this.initRenderer();
  }

  static initRenderer() {
    this.screenTriangle = getFullscreenTriangle();

    // Fullscreen triangle
    this.screenCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.screen = new Mesh(this.screenTriangle);
    this.screen.frustumCulled = false;

    // Render targets
    this.renderTarget = new WebGLRenderTarget(1, 1, {
      depthBuffer: false
    });

    this.renderTargetsHorizontal = [];
    this.renderTargetsVertical = [];
    this.nMips = 5;

    this.renderTargetBright = this.renderTarget.clone();

    for (let i = 0, l = this.nMips; i < l; i++) {
      this.renderTargetsHorizontal.push(this.renderTarget.clone());
      this.renderTargetsVertical.push(this.renderTarget.clone());
    }

    this.renderTarget.depthBuffer = true;

    // Luminosity high pass material
    this.luminosityMaterial = new LuminosityMaterial();
    this.luminosityMaterial.uniforms.uThreshold.value = this.luminosityThreshold;
    this.luminosityMaterial.uniforms.uSmoothing.value = this.luminositySmoothing;

    // Separable Gaussian blur materials
    this.blurMaterials = [];

    const kernelSizeArray = [3, 5, 7, 9, 11];

    for (let i = 0, l = this.nMips; i < l; i++) {
      this.blurMaterials.push(new UnrealBloomBlurMaterial(kernelSizeArray[i]));
    }

    // Bloom composite material
    this.bloomCompositeMaterial = new BloomCompositeMaterial();
    this.bloomCompositeMaterial.uniforms.tBlur1.value = this.renderTargetsVertical[0].texture;
    this.bloomCompositeMaterial.uniforms.tBlur2.value = this.renderTargetsVertical[1].texture;
    this.bloomCompositeMaterial.uniforms.tBlur3.value = this.renderTargetsVertical[2].texture;
    this.bloomCompositeMaterial.uniforms.tBlur4.value = this.renderTargetsVertical[3].texture;
    this.bloomCompositeMaterial.uniforms.tBlur5.value = this.renderTargetsVertical[4].texture;
    this.bloomCompositeMaterial.uniforms.uBloomFactors.value = this.bloomFactors();

    // Composite material
    this.compositeMaterial = new SceneCompositeDistortionMaterial({
      dithering: true
    });
    this.compositeMaterial.uniforms.uBloomDistortion.value = this.bloomDistortion;
  }

  static bloomFactors() {
    const bloomFactors = [1, 0.8, 0.6, 0.4, 0.2];

    for (let i = 0, l = this.nMips; i < l; i++) {
      const factor = bloomFactors[i];
      bloomFactors[i] = this.bloomStrength * MathUtils.lerp(factor, 1.2 - factor, this.bloomRadius);
    }

    return bloomFactors;
  }

  // Public methods

  static resize = (width: number, height: number, dpr: number) => {
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height);

    width = Math.round(width * dpr);
    height = Math.round(height * dpr);

    this.renderTarget.setSize(width, height);

    width = MathUtils.floorPowerOfTwo(width) / 2;
    height = MathUtils.floorPowerOfTwo(height) / 2;

    this.renderTargetBright.setSize(width, height);

    for (let i = 0, l = this.nMips; i < l; i++) {
      this.renderTargetsHorizontal[i].setSize(width, height);
      this.renderTargetsVertical[i].setSize(width, height);

      this.blurMaterials[i].uniforms.uResolution.value.set(width, height);

      width /= 2;
      height /= 2;
    }
  };

  static update = () => {
    const renderer = this.renderer;
    const scene = this.scene;
    const camera = this.camera;

    if (!this.enabled) {
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);
      return;
    }

    const renderTarget = this.renderTarget;
    const renderTargetBright = this.renderTargetBright;
    const renderTargetsHorizontal = this.renderTargetsHorizontal;
    const renderTargetsVertical = this.renderTargetsVertical;

    // Scene pass
    renderer.setRenderTarget(renderTarget);
    renderer.render(scene, camera);

    // Extract bright areas
    this.luminosityMaterial.uniforms.tMap.value = renderTarget.texture;
    this.screen.material = this.luminosityMaterial;
    renderer.setRenderTarget(renderTargetBright);
    renderer.render(this.screen, this.screenCamera);

    // Blur all the mips progressively
    let inputRenderTarget = renderTargetBright;

    for (let i = 0, l = this.nMips; i < l; i++) {
      this.screen.material = this.blurMaterials[i];

      this.blurMaterials[i].uniforms.tMap.value = inputRenderTarget.texture;
      this.blurMaterials[i].uniforms.uDirection.value = BlurDirectionX;
      renderer.setRenderTarget(renderTargetsHorizontal[i]);
      renderer.render(this.screen, this.screenCamera);

      this.blurMaterials[i].uniforms.tMap.value = this.renderTargetsHorizontal[i].texture;
      this.blurMaterials[i].uniforms.uDirection.value = BlurDirectionY;
      renderer.setRenderTarget(renderTargetsVertical[i]);
      renderer.render(this.screen, this.screenCamera);

      inputRenderTarget = renderTargetsVertical[i];
    }

    // Composite all the mips
    this.screen.material = this.bloomCompositeMaterial;
    renderer.setRenderTarget(renderTargetsHorizontal[0]);
    renderer.render(this.screen, this.screenCamera);

    // Composite pass (render to screen)
    this.compositeMaterial.uniforms.tScene.value = renderTarget.texture;
    this.compositeMaterial.uniforms.tBloom.value = renderTargetsHorizontal[0].texture;
    this.screen.material = this.compositeMaterial;
    renderer.setRenderTarget(null);
    renderer.render(this.screen, this.screenCamera);
  };
}

export default _;
