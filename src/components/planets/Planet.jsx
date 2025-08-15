import React, { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

/**
 * Generic Planet component.
 * Props:
 * - texturePath: String URL of planet texture
 * - radius: Orbit radius around origin
 * - size: Planet radius size
 * - speed: Orbit angular speed
 * - rotationSpeed: Self-rotation speed
 * - orbitTilt: [x, y, z] radians tilt of orbital plane
 * - ring: { texturePath, innerRadius, outerRadius } optional for rings
 * - children: anything you want to orbit with the planet (moons, cubes, etc.)
 */
export default function Planet({
  texturePath,
  radius,
  size,
  speed,
  rotationSpeed,
  orbitTilt = [0, 0, 0],
  ring = null,
  children,                 // ← NEW: allow moons/cubes/etc.
  ...groupProps             // ← optional: forward extra props (onClick, etc.)
}) {
  const pivot       = useRef()
  const planetGroup = useRef()
  const mesh        = useRef()

  const texture     = useLoader(TextureLoader, texturePath)
  const ringTexture = ring ? useLoader(TextureLoader, ring.texturePath) : null

  useFrame(({ clock }) => {
    const t     = clock.getElapsedTime()
    const angle = t * speed

    // move the entire planet+ring
    planetGroup.current.position.set(
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    )
    // spin the planet+ring around its own Y
    planetGroup.current.rotation.y += rotationSpeed

    // tilt the orbit
    pivot.current.rotation.set(...orbitTilt)
  })

  return (
    <group ref={pivot} {...groupProps}>
      <group ref={planetGroup}>
        {/* the sphere itself */}
        <mesh ref={mesh}>
          <sphereGeometry args={[size, 64, 64]} />
          <meshStandardMaterial map={texture} />
        </mesh>

        {/* optional ring */}
        {ring && ringTexture && (
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[ring.innerRadius, ring.outerRadius, 64]} />
            <meshStandardMaterial
              map={ringTexture}
              transparent
              side={2}      /* THREE.DoubleSide */
            />
          </mesh>
        )}

        {/* NEW: anything passed in (moon, SocialCube, etc.) orbits with the planet */}
        {children}
      </group>
    </group>
  )
}
