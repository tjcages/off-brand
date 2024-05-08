"use client";

import {
  Reflector // @ts-expect-error - Ignore import error
} from "@alienkitty/alien.js/src/three";
import {
  Color,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  RepeatWrapping,
  Vector2
} from "three";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadTexture: (url: string) => Promise<any>;
}

class _ extends Group {
  controller: Props;
  reflector: Reflector;

  constructor(controller: Props) {
    super();

    this.controller = controller;

    this.initReflector();
  }

  initReflector() {
    this.reflector = new Reflector();
  }

  async initMesh() {
    const { loadTexture } = this.controller;

    const geometry = new PlaneGeometry(100, 100);

    // Second set of UVs for aoMap and lightMap
    // https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.aoMap
    geometry.attributes.uv1 = geometry.attributes.uv;

    // Textures
    const [map, normalMap, ormMap] = await Promise.all([
      // loadTexture('../assets/textures/uv.jpg'),
      loadTexture("/textures/pbr/polished_concrete_basecolor.jpg"),
      loadTexture("/textures/pbr/polished_concrete_normal.jpg"),
      // https://occlusion-roughness-metalness.glitch.me/
      loadTexture("/textures/pbr/polished_concrete_orm.jpg")
    ]);

    map.wrapS = RepeatWrapping;
    map.wrapT = RepeatWrapping;
    map.repeat.set(32, 32);

    normalMap.wrapS = RepeatWrapping;
    normalMap.wrapT = RepeatWrapping;
    normalMap.repeat.set(16, 16);

    ormMap.wrapS = RepeatWrapping;
    ormMap.wrapT = RepeatWrapping;
    ormMap.repeat.set(16, 16);

    const material = new MeshStandardMaterial({
      color: new Color().offsetHSL(0, 0, -0.85),
      metalness: 1,
      roughness: 0.5,
      map,
      metalnessMap: ormMap,
      roughnessMap: ormMap,
      aoMap: ormMap,
      aoMapIntensity: 1,
      normalMap,
      normalScale: new Vector2(3, 3)
    });

    // Second channel for aoMap and lightMap
    // https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.aoMap
    if (material.aoMap) material.aoMap.channel = 1;

    const uniforms = {
      mirror: { value: 0 },
      mixStrength: { value: 10 }
    };

    material.onBeforeCompile = shader => {
      shader.uniforms.reflectMap = this.reflector.renderTargetUniform;
      shader.uniforms.textureMatrix = this.reflector.textureMatrixUniform;

      shader.uniforms = Object.assign(shader.uniforms, uniforms);

      shader.vertexShader = shader.vertexShader.replace(
        "void main() {",
        /* glsl */ `
                  uniform mat4 textureMatrix;
                  out vec4 vCoord;
                  out vec3 vToEye;

                  void main() {
                  `
      );

      shader.vertexShader = shader.vertexShader.replace(
        "#include <project_vertex>",
        /* glsl */ `
                  #include <project_vertex>

                  vCoord = textureMatrix * vec4(transformed, 1.0);
                  vToEye = cameraPosition - (modelMatrix * vec4(transformed, 1.0)).xyz;
                  `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "void main() {",
        /* glsl */ `
                  uniform sampler2D reflectMap;
                  uniform float mirror;
                  uniform float mixStrength;
                  in vec4 vCoord;
                  in vec3 vToEye;

                  void main() {
                  `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <emissivemap_fragment>",
        /* glsl */ `
                  #include <emissivemap_fragment>

                  vec4 normalColor = texture2D(normalMap, vNormalMapUv * normalScale);
                  vec3 reflectNormal = normalize(vec3(normalColor.r * 2.0 - 1.0, normalColor.b, normalColor.g * 2.0 - 1.0));
                  vec3 reflectCoord = vCoord.xyz / vCoord.w;
                  vec2 reflectUv = reflectCoord.xy + reflectCoord.z * reflectNormal.xz * 0.05;
                  vec4 reflectColor = texture2D(reflectMap, reflectUv);

                  // Fresnel term
                  vec3 toEye = normalize(vToEye);
                  float theta = max(dot(toEye, normal), 0.0);
                  float reflectance = pow((1.0 - theta), 5.0);

                  reflectColor = mix(vec4(0), reflectColor, reflectance);

                  diffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + reflectColor.rgb * mixStrength);
                  `
      );
    };

    const mesh = new Mesh(geometry, material);
    mesh.position.y = -0.75;
    mesh.rotation.x = -Math.PI / 2;
    mesh.add(this.reflector);

    mesh.onBeforeRender = (renderer, scene, camera) => {
      this.visible = false;
      this.reflector.update(renderer, scene, camera);
      this.visible = true;
    };

    this.add(mesh);
  }

  // Public methods

  resize = (width: number, height: number) => {
    width = MathUtils.floorPowerOfTwo(width) / 2;
    height = 1024;

    this.reflector.setSize(width, height);
  };
}

export default _;
