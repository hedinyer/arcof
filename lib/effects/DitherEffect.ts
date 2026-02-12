import * as THREE from "three";
import { Effect, BlendFunction } from "postprocessing";

const ditherFragmentShader = /* glsl */ `
uniform vec2 resolution;
uniform float gridSize;
uniform float colorNum;
uniform float pixelSize;

// 4x4 Bayer matrix for ordered dithering
const mat4 bayerMatrix = mat4(
  0.0/16.0,  8.0/16.0,  2.0/16.0, 10.0/16.0,
  12.0/16.0, 4.0/16.0, 14.0/16.0,  6.0/16.0,
  3.0/16.0, 11.0/16.0,  1.0/16.0,  9.0/16.0,
  15.0/16.0, 7.0/16.0, 13.0/16.0,  5.0/16.0
);

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 fragCoord = uv * resolution;
  
  vec2 pixelatedUV = uv;
  if (pixelSize > 0.0) {
    vec2 pixelGrid = resolution / pixelSize;
    pixelatedUV = (floor(uv * pixelGrid) + 0.5) / pixelGrid;
  }
  
  vec4 texel = texture2D(inputBuffer, pixelatedUV);
  vec3 color = texel.rgb;
  
  int x = int(mod(floor(fragCoord.x / max(gridSize, 1.0)), 4.0));
  int y = int(mod(floor(fragCoord.y / max(gridSize, 1.0)), 4.0));
  float threshold = bayerMatrix[y][x];
  
  float levels = max(colorNum, 2.0);
  color += threshold / 16.0;
  color.r = floor(color.r * (levels - 1.0) + 0.5) / (levels - 1.0);
  color.g = floor(color.g * (levels - 1.0) + 0.5) / (levels - 1.0);
  color.b = floor(color.b * (levels - 1.0) + 0.5) / (levels - 1.0);
  
  outputColor = vec4(color, texel.a);
}
`;

export interface DitherEffectOptions {
  blendFunction?: BlendFunction;
  gridSize?: number;
  colorNum?: number;
  pixelSize?: number;
}

export class DitherEffectImpl extends Effect {
  constructor(options: DitherEffectOptions = {}) {
    const {
      blendFunction = BlendFunction.NORMAL,
      gridSize = 4,
      colorNum = 4,
      pixelSize = 2,
    } = options;

    super("DitherEffect", ditherFragmentShader, {
      blendFunction,
      uniforms: new Map<string, THREE.Uniform<THREE.Vector2 | number>>([
        ["resolution", new THREE.Uniform(new THREE.Vector2(1, 1))],
        ["gridSize", new THREE.Uniform(gridSize)],
        ["colorNum", new THREE.Uniform(colorNum)],
        ["pixelSize", new THREE.Uniform(pixelSize)],
      ]),
    });
  }

  setSize(width: number, height: number): void {
    const resolutionUniform = this.uniforms.get("resolution") as THREE.Uniform<THREE.Vector2>;
    if (resolutionUniform?.value) {
      resolutionUniform.value.set(width, height);
    }
  }
}
