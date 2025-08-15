// EarthShaderMaterial.js
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { extend } from '@react-three/fiber'

const EarthShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uDayTexture: null,
    uNightTexture: null,
    uLightDirection: new THREE.Vector3(1, 0, 0), // Should match sun's direction
    uBlendFactor: 0.0, // still retained in case you want procedural mix
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vWorldNormal;

    void main() {
      vUv = uv;
      vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform sampler2D uDayTexture;
    uniform sampler2D uNightTexture;
    uniform vec3 uLightDirection;
    uniform float uBlendFactor;

    varying vec2 vUv;
    varying vec3 vWorldNormal;

    void main() {
      vec3 dayColor = texture2D(uDayTexture, vUv).rgb;
      vec3 nightColor = texture2D(uNightTexture, vUv).rgb;

      float lightFactor = dot(normalize(vWorldNormal), normalize(uLightDirection));
      lightFactor = clamp(lightFactor, 0.0, 1.0);

      vec3 baseColor = mix(nightColor, dayColor, lightFactor);

      // Optional: procedural banding
      float bands = sin(vUv.y * 50.0 + uTime) * 0.1;
      vec3 procedural = baseColor + bands;
      vec3 finalColor = mix(baseColor, procedural, uBlendFactor);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
)

extend({ EarthShaderMaterial })

export default EarthShaderMaterial
