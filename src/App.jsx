import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import SunShaderMaterial from './SunShaderMaterial'
import { TextureLoader } from 'three'
import EarthShaderMaterial from './EarthShaderMaterial'
import AuroraShaderMaterial from './AuroraShaderMaterial'
import SocialCube from './SocialCube'
import Mercury from './components/planets/Mercury'
import Venus from './components/planets/Venus'
import Mars from './components/planets/Mars'
import Jupiter from './components/planets/Jupiter'
import Saturn from './components/planets/Saturn'
import Uranus from './components/planets/Uranus'
import Neptune from './components/planets/Neptune'
import Overlay from './Overlay'
import ProjectModal from './ProjectModal'
import { PROJECTS } from './projects'
import SectionsPanel from './SectionsPanel'

useGLTF.preload('/models/astronaut.glb')

/* ------------------------- Helpers / Mini Components ------------------------ */

// Track the live world position of the first mesh found under `rootRef`
function PlanetTracker({ rootRef, name, store }) {
  const tmp = useRef(new THREE.Vector3())
  useFrame(() => {
    if (!rootRef.current) return
    let mesh = null
    rootRef.current.traverse((obj) => {
      if (!mesh && obj.isMesh) mesh = obj
    })
    if (mesh) {
      mesh.getWorldPosition(tmp.current)
      store.current.set(name, tmp.current.clone())
    }
  })
  return null
}

// Follows a planet until user interacts
function CameraFollower({ followKey, positionsRef, controlsRef, getDistance }) {
  useFrame((state) => {
    if (!followKey) return
    const look = positionsRef.current.get(followKey)
    if (!look) return

    const desiredDist = getDistance(followKey)
    const dir = state.camera.position.clone().sub(look)
    if (dir.lengthSq() < 1e-6) dir.set(0, 0, 1)
    dir.setLength(desiredDist)
    const desiredPos = look.clone().add(dir)

    const camAlpha = 0.18
    const tgtAlpha = 0.25

    state.camera.position.lerp(desiredPos, camAlpha)
    if (controlsRef.current?.target) {
      controlsRef.current.target.lerp(look, tgtAlpha)
      controlsRef.current.update()
    }
  })
  return null
}

// Cancels follow mode when the user interacts (pointer or wheel)
function UserInputCancel({ onCancel }) {
  const { gl } = useThree()
  useEffect(() => {
    const el = gl.domElement
    const cancel = () => onCancel?.()
    el.addEventListener('pointerdown', cancel)
    el.addEventListener('wheel', cancel, { passive: true })
    return () => {
      el.removeEventListener('pointerdown', cancel)
      el.removeEventListener('wheel', cancel)
    }
  }, [gl, onCancel])
  return null
}

/* --------------------------------- Scene ---------------------------------- */

function AstronautModel() {
  const { scene } = useGLTF('/models/astronaut.glb')
  const ref = useRef()
  const pressedKeys = useRef({})

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.color.set('white')
    }
  })

  useEffect(() => {
    const down = (e) => (pressedKeys.current[e.key.toLowerCase()] = true)
    const up = (e) => (pressedKeys.current[e.key.toLowerCase()] = false)

    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  useFrame((state) => {
    if (!ref.current) return

    const speed = 0.05
    const move = new THREE.Vector3()
    const direction = new THREE.Vector3()
    const side = new THREE.Vector3()
    const up = new THREE.Vector3()

    state.camera.getWorldDirection(direction).normalize()
    side.crossVectors(direction, state.camera.up).normalize()
    up.copy(state.camera.up).applyQuaternion(state.camera.quaternion).normalize()

    if (pressedKeys.current['w']) move.add(direction.multiplyScalar(speed))
    if (pressedKeys.current['s']) move.add(direction.multiplyScalar(-speed))
    if (pressedKeys.current['a']) move.add(side.multiplyScalar(-speed))
    if (pressedKeys.current['d']) move.add(side.multiplyScalar(speed))
    if (pressedKeys.current['arrowup']) move.add(up.multiplyScalar(speed))
    if (pressedKeys.current['arrowdown']) move.add(up.multiplyScalar(-speed))

    ref.current.position.add(move)
    ref.current.rotation.y += 0.005
    ref.current.position.y += Math.sin(state.clock.elapsedTime) * 0.002
  })

  return (
    <group ref={ref} position={[0, 0, 14]}>
      <pointLight intensity={5} distance={10} color="white" />
      <primitive object={scene} scale={4} />
    </group>
  )
}

function Sun() {
  const sunRef = useRef()

  useFrame(({ clock }) => {
    if (sunRef.current?.material?.uniforms) {
      sunRef.current.material.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[30, 64, 64]} />
      <sunShaderMaterial attach="material" />
    </mesh>
  )
}

function PlanetSystem({ radius = 120 }) {
  const planetGroup = useRef()
  const planetRef = useRef()
  const cloudRef = useRef()

  const dayTexture = useLoader(TextureLoader, '/textures/earth_diffuse.jpg')
  const nightTexture = useLoader(TextureLoader, '/textures/8k_earth_nightmap.jpg')
  const cloudTexture = useLoader(TextureLoader, '/textures/8k_earth_clouds.jpg')

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const x = Math.cos(t * 0.05) * radius
    const z = Math.sin(t * 0.05) * radius
    planetGroup.current.position.set(x, 0, z)
    planetRef.current.rotation.y += 0.003
    if (cloudRef.current) cloudRef.current.rotation.y -= 0.002

    if (planetRef.current.material?.uniforms) {
      const sunDirection = new THREE.Vector3().subVectors(new THREE.Vector3(0, 0, 0), planetGroup.current.position).normalize()
      planetRef.current.material.uniforms.uLightDirection.value.copy(sunDirection)
      planetRef.current.material.uniforms.uTime.value = t
    }
  })

  return (
    <group ref={planetGroup}>
      <mesh ref={planetRef}>
        <sphereGeometry args={[4, 64, 64]} />
        <earthShaderMaterial
          uDayTexture={dayTexture}
          uNightTexture={nightTexture}
          uLightDirection={new THREE.Vector3(1, 0, 0)}
          uTime={0}
          uBlendFactor={0.0}
        />
      </mesh>
      <mesh ref={cloudRef}>
        <sphereGeometry args={[4.02, 64, 64]} />
        <meshStandardMaterial map={cloudTexture} transparent opacity={0.4} depthWrite={false} />
      </mesh>
      <mesh position={[0, 3.2, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[3, 5, 64, 1, true]} />
        <auroraShaderMaterial transparent depthWrite={false} uTime={0} />
      </mesh>
      <mesh position={[0, -3.4, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[3, 5, 64, 1, true]} />
        <auroraShaderMaterial transparent depthWrite={false} uTime={0} />
      </mesh>
      <SocialCube
        texturePath="/textures/linkedin.jpg"
        orbitRadius={8}
        speed={0.2}
        size={2}
        orbitTilt={[THREE.MathUtils.degToRad(30), 0, 0]}
        link="https://linkedin.com"
      />
      <SocialCube
        texturePath="/textures/twitter.jpg"
        orbitRadius={10}
        speed={0.12}
        size={2}
        orbitTilt={[THREE.MathUtils.degToRad(-30), 0, 0]}
        link="https://twitter.com"
      />
    </group>
  )
}

/* ---------------------------------- App ----------------------------------- */

export default function App() {
  const [panel, setPanel] = useState(null)
  const [hovered, setHovered] = useState(false)
  const [projectKey, setProjectKey] = useState(null)

  // live planet positions (name -> THREE.Vector3)
  const planetPosRef = useRef(new Map())

  // Refs for wrappers so trackers can traverse down to meshes
  const earthWrap = useRef()
  const mercuryWrap = useRef()
  const venusWrap = useRef()
  const marsWrap = useRef()
  const jupiterWrap = useRef()
  const saturnWrap = useRef()
  const uranusWrap = useRef()
  const neptuneWrap = useRef()

  // Follow mode: which planet are we following? null = off
  const [followKey, setFollowKey] = useState(null)

  // Store initial camera/target for Reset
  const initialCam = useRef({ pos: new THREE.Vector3(0, 10, 300), target: new THREE.Vector3(0, 0, 0) })
  const controlsRef = useRef()

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'default'
    return () => (document.body.style.cursor = 'default')
  }, [hovered])

  // Capture the actual initial camera & target after controls mount
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (controlsRef.current) {
        initialCam.current = {
          pos: controlsRef.current.object.position.clone(),
          target: controlsRef.current.target.clone(),
        }
      }
    })
    return () => cancelAnimationFrame(id)
  }, [])

  const openProject = (key) => setProjectKey(key)
  const closeProject = () => setProjectKey(null)

  // Per-planet framing distances (keep your zoom feel)
  const CAMERA_DIST = {
    mercury: 10, venus: 12, earth: 18, mars: 12,
    jupiter: 26, saturn: 26, uranus: 22, neptune: 22,
  }
  const getDistance = (name) => CAMERA_DIST[name] ?? 18

  // Bottom buttons -> enter follow mode
  const jumpToPlanet = (name) => setFollowKey(name)

  // NEW: Reset view to initial camera state, exit follow mode
  const resetView = () => {
    setFollowKey(null)
    if (controlsRef.current) {
      // Force camera & target back to the captured initial state,
      // then call controls.reset() to sync internals.
      const { pos, target } = initialCam.current
      controlsRef.current.object.position.copy(pos)
      controlsRef.current.target.copy(target)
      controlsRef.current.object.updateProjectionMatrix?.()
      controlsRef.current.update()
      controlsRef.current.reset()
    }
  }

  return (
    <>
      <Canvas camera={{ position: [0, 10, 300], fov: 60 }} style={{ height: '100vh', width: '100vw' }}>
        <color attach="background" args={['black']} />
        <Stars radius={180} depth={80} count={10808} factor={18} fade />
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 10]} intensity={2} />

        <Suspense fallback={null}>
          <Sun />

          {/* Wrap Earth to track its actual world position */}
          <group ref={earthWrap}>
            <PlanetSystem />
            <PlanetTracker rootRef={earthWrap} name="earth" store={planetPosRef} />
          </group>

          <group
            ref={mercuryWrap}
            onClick={(e) => { e.stopPropagation(); openProject('mercury') }}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <Mercury />
            <PlanetTracker rootRef={mercuryWrap} name="mercury" store={planetPosRef} />
          </group>

          <group
            ref={venusWrap}
            onClick={(e) => { e.stopPropagation(); openProject('venus') }}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <Venus />
            <PlanetTracker rootRef={venusWrap} name="venus" store={planetPosRef} />
          </group>

          <group
            ref={marsWrap}
            onClick={(e) => { e.stopPropagation(); openProject('mars') }}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <Mars />
            <PlanetTracker rootRef={marsWrap} name="mars" store={planetPosRef} />
          </group>

          <group
            ref={jupiterWrap}
            onClick={(e) => { e.stopPropagation(); openProject('jupiter') }}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <Jupiter />
            <PlanetTracker rootRef={jupiterWrap} name="jupiter" store={planetPosRef} />
          </group>

          <group
            ref={saturnWrap}
            onClick={(e) => { e.stopPropagation(); openProject('saturn') }}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <Saturn />
            <PlanetTracker rootRef={saturnWrap} name="saturn" store={planetPosRef} />
          </group>

          <group
            ref={uranusWrap}
            onClick={(e) => { e.stopPropagation(); openProject('uranus') }}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <Uranus />
            <PlanetTracker rootRef={uranusWrap} name="uranus" store={planetPosRef} />
          </group>

          <group
            ref={neptuneWrap}
            onClick={(e) => { e.stopPropagation(); openProject('neptune') }}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <Neptune />
            <PlanetTracker rootRef={neptuneWrap} name="neptune" store={planetPosRef} />
          </group>

          <AstronautModel />
        </Suspense>

        {/* Follow current planet (if any) */}
        <CameraFollower
          followKey={followKey}
          positionsRef={planetPosRef}
          controlsRef={controlsRef}
          getDistance={getDistance}
        />

        {/* Cancel follow on any user interaction */}
        <UserInputCancel onCancel={() => setFollowKey(null)} />

        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.05}
          zoomToCursor
          minDistance={3}
          maxDistance={1000}
          onStart={() => setFollowKey(null)}
          mouseButtons={{
            LEFT:   THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT:  THREE.MOUSE.ROTATE,
          }}
        />
      </Canvas>

      <Overlay onOpen={setPanel} onPlanet={(name) => setFollowKey(name)} onReset={resetView} />

      <SectionsPanel
        panel={panel}
        onClose={() => setPanel(null)}
        onOpenProject={(key) => {
          setPanel(null)
          setProjectKey(key)
        }}
      />

      <ProjectModal project={PROJECTS[projectKey]} onClose={() => setProjectKey(null)} />
    </>
  )
}
