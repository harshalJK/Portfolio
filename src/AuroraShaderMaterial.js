// AuroraShaderMaterial.js
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { extend } from '@react-three/fiber'

const AuroraShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0x00ff99),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying float vY;

    void main() {
      vUv = uv;
      vY = position.y;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec3 uColor;

    varying vec2 vUv;
    varying float vY;

    void main() {
      float intensity = smoothstep(0.3, 0.0, abs(vUv.y - 0.5)) * 0.8;
      float pulse = 0.5 + 0.5 * sin(uTime * 2.0 + vUv.x * 10.0);
      float fade = exp(-abs(vY) * 0.8);

      vec3 color = uColor * intensity * pulse * fade;
      gl_FragColor = vec4(color, intensity * pulse * fade);
    }
  `
)

extend({ AuroraShaderMaterial })

export default AuroraShaderMaterial
