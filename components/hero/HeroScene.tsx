"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer } from "@react-three/postprocessing";
import { DitherEffect } from "./DitherEffect";

function GenerativeBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  const clockRef = useRef(new THREE.Clock());
  const pointerRef = useRef({ x: 0.5, y: 0.5 });

  const fragmentShader = /* glsl */ `
    uniform float uTime;
    uniform vec2 uPointer;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    void main() {
      vec2 uv = vUv - 0.5;
      vec2 mouseOffset = (uPointer - 0.5) * 0.1;
      uv += mouseOffset;
      float n = noise(uv * 4.0 + uTime * 0.2);
      float n2 = noise(uv * 8.0 + 100.0 + uTime * 0.15);
      vec3 col = mix(
        vec3(0.05, 0.02, 0.12),
        vec3(0.15, 0.05, 0.25),
        n
      );
      col = mix(col, vec3(0.9, 0.35, 0.45) * 0.3, n2 * 0.4);
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  const vertexShader = /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const { pointer } = useThree();
  useFrame(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms?.uTime) {
        material.uniforms.uTime.value = clockRef.current.getElapsedTime();
      }
      if (material.uniforms?.uPointer) {
        const px = (pointer.x + 1) * 0.5;
        const py = (pointer.y + 1) * 0.5;
        pointerRef.current.x += (px - pointerRef.current.x) * 0.05;
        pointerRef.current.y += (py - pointerRef.current.y) * 0.05;
        material.uniforms.uPointer.value.set(
          pointerRef.current.x,
          pointerRef.current.y
        );
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uPointer: { value: new THREE.Vector2(0.5, 0.5) },
        }}
        depthWrite={false}
      />
    </mesh>
  );
}

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const clockRef = useRef(new THREE.Clock());

  useFrame(() => {
    if (meshRef.current) {
      const t = clockRef.current.getElapsedTime();
      meshRef.current.rotation.x = t * 0.1;
      meshRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[0.5, 1]} />
      <meshStandardMaterial
        color="#FF385C"
        emissive="#FF385C"
        emissiveIntensity={0.3}
        wireframe
      />
    </mesh>
  );
}

export function HeroScene() {
  return (
    <>
      <color attach="background" args={["#0A0A0B"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <GenerativeBackground />
      <FloatingGeometry />
      <EffectComposer>
        <DitherEffect gridSize={4} colorNum={4} pixelSize={2} />
      </EffectComposer>
    </>
  );
}
