    // src/components/planets/Uranus.jsx
    import React from 'react'
    import Planet from './Planet'
    import * as THREE from 'three'
    import SkillsCube from '../../SkillsCube'

    const d = THREE.MathUtils.degToRad

    export default function Uranus() {
    const size = 1.8 // a touch smaller so they don’t overlap visually

    return (
        <Planet
        texturePath="/textures/uranus.jpg"
        radius={300}
        size={6}
        speed={0.06}
        rotationSpeed={0.002}
        orbitTilt={[0, d(60), 0]}
        >
        {/* Ring A (inner): slight negative tilt, elevated up */}
        <SkillsCube texturePath="/textures/AWS.png"        orbitRadius={12.0} speed={0.16} size={size} orbitTilt={[d(-18), 0, 0]} phase={d(  0)} elevation={+0.5} />
        <SkillsCube texturePath="/textures/dynamodb.png"   orbitRadius={12.0} speed={0.16} size={size} orbitTilt={[d(-18), 0, 0]} phase={d(120)} elevation={+0.5} />
        <SkillsCube texturePath="/textures/Athena.png"     orbitRadius={12.0} speed={0.16} size={size} orbitTilt={[d(-18), 0, 0]} phase={d(240)} elevation={+0.5} />

        {/* Ring B (middle): mild positive tilt, zero elevation */}
        <SkillsCube texturePath="/textures/S3.png"         orbitRadius={13.2} speed={0.18} size={size} orbitTilt={[d(10),  0, 0]} phase={d( 45)} elevation={ 0.0} />
        <SkillsCube texturePath="/textures/GCP.png"        orbitRadius={13.2} speed={0.18} size={size} orbitTilt={[d(10),  0, 0]} phase={d(165)} elevation={ 0.0} />
        <SkillsCube texturePath="/textures/Azure.png"      orbitRadius={13.2} speed={0.18} size={size} orbitTilt={[d(10),  0, 0]} phase={d(285)} elevation={ 0.0} />

        {/* Ring C (outer): stronger tilt, elevated down */}
        <SkillsCube texturePath="/textures/PostgreSQL.png" orbitRadius={14.4} speed={0.21} size={size} orbitTilt={[d(32),  0, 0]} phase={d( 90)} elevation={-0.5} />
        <SkillsCube texturePath="/textures/mongodb.png"    orbitRadius={14.4} speed={0.21} size={size} orbitTilt={[d(32),  0, 0]} phase={d(270)} elevation={-0.5} />
        </Planet>
    )
    }
