    // src/components/planets/Saturn.jsx
    import React from 'react'
    import Planet from './Planet'
    import * as THREE from 'three'
    import SkillsCube from '../../SkillsCube'

    const d = THREE.MathUtils.degToRad

    export default function Saturn() {
    const size = 1.8 // slightly smaller so they sit nicely above the rings

    return (
        <Planet
        texturePath="/textures/saturn.jpg"
        radius={250}
        size={7}
        speed={0.10}
        rotationSpeed={0.001}
        orbitTilt={[0, d(50), 0]}
        ring={{ texturePath: '/textures/saturn_ring.png', innerRadius: 9, outerRadius: 20 }}
        >
        {/* Ring A (inner): slight negative tilt, a bit above the ring plane */}
        <SkillsCube texturePath="/textures/Flask.png"    orbitRadius={12.8} speed={0.17} size={size} orbitTilt={[d(-15), 0, 0]} phase={d(  0)} elevation={+0.45} />
        <SkillsCube texturePath="/textures/React.png"    orbitRadius={12.8} speed={0.17} size={size} orbitTilt={[d(-15), 0, 0]} phase={d(180)} elevation={+0.45} />

        {/* Ring B (middle): mild positive tilt, on the ring plane */}
        <SkillsCube texturePath="/textures/Angular.png"  orbitRadius={14.6} speed={0.19} size={size} orbitTilt={[d(10),  0, 0]} phase={d( 60)} elevation={ 0.0} />
        <SkillsCube texturePath="/textures/Fastapi.png"  orbitRadius={14.6} speed={0.19} size={size} orbitTilt={[d(10),  0, 0]} phase={d(240)} elevation={ 0.0} />

        {/* Ring C (outer): stronger tilt, a bit below the ring plane */}
        <SkillsCube texturePath="/textures/DotNet.png"   orbitRadius={16.8} speed={0.21} size={size} orbitTilt={[d(35),  0, 0]} phase={d(120)} elevation={-0.45} />
        <SkillsCube texturePath="/textures/Pytorch.png"  orbitRadius={16.8} speed={0.21} size={size} orbitTilt={[d(35),  0, 0]} phase={d(300)} elevation={-0.45} />
        </Planet>
    )
    }
