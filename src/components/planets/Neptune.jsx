    // src/components/planets/Neptune.jsx
    import React from 'react'
    import Planet from './Planet'
    import * as THREE from 'three'
    import SkillsCube from '../../SkillsCube'

    const d = THREE.MathUtils.degToRad

    export default function Neptune() {
    const size = 1.7

    return (
        <Planet
        texturePath="/textures/neptune.jpg"
        radius={350}
        size={6}
        speed={0.04}
        rotationSpeed={0.002}
        orbitTilt={[0, d(70), 0]}
        >
        {/* Ring A (inner) */}
        <SkillsCube texturePath="/textures/Python.png"      orbitRadius={12.0} speed={0.17} size={size} orbitTilt={[d(-18), 0, 0]} phase={d(  0)} elevation={+0.5} />
        <SkillsCube texturePath="/textures/Java.png"        orbitRadius={12.0} speed={0.17} size={size} orbitTilt={[d(-18), 0, 0]} phase={d( 90)} elevation={+0.5} />
        <SkillsCube texturePath="/textures/Nodejs.png"      orbitRadius={12.0} speed={0.17} size={size} orbitTilt={[d(-18), 0, 0]} phase={d(180)} elevation={+0.5} />
        <SkillsCube texturePath="/textures/JavaScript.png"  orbitRadius={12.0} speed={0.17} size={size} orbitTilt={[d(-18), 0, 0]} phase={d(270)} elevation={+0.5} />

        {/* Ring B (middle) */}
        <SkillsCube texturePath="/textures/C++.png"         orbitRadius={13.2} speed={0.19} size={size} orbitTilt={[d(8),  0, 0]} phase={d(  0)} elevation={ 0.0} />
        <SkillsCube texturePath="/textures/Bash.png"        orbitRadius={13.2} speed={0.19} size={size} orbitTilt={[d(8),  0, 0]} phase={d(240)} elevation={ 0.0} />

        {/* Ring C (outer 1) */}
        <SkillsCube texturePath="/textures/HTML5.png"        orbitRadius={14.4} speed={0.21} size={size} orbitTilt={[d(28), 0, 0]} phase={d( 60)} elevation={-0.5} />
        <SkillsCube texturePath="/textures/Typescript.png"  orbitRadius={14.4} speed={0.21} size={size} orbitTilt={[d(28), 0, 0]} phase={d(180)} elevation={-0.5} />
        <SkillsCube texturePath="/textures/Css.png"         orbitRadius={14.4} speed={0.21} size={size} orbitTilt={[d(28), 0, 0]} phase={d(300)} elevation={-0.5} />

        {/* Ring D (outer 2) */}
        <SkillsCube texturePath="/textures/GO.png"          orbitRadius={15.6} speed={0.23} size={size} orbitTilt={[d(-35), 0, 0]} phase={d( 30)} elevation={+0.3} />
        <SkillsCube texturePath="/textures/Matlab.png"      orbitRadius={15.6} speed={0.23} size={size} orbitTilt={[d(-35), 0, 0]} phase={d(150)} elevation={+0.3} />
        <SkillsCube texturePath="/textures/SQL.png"         orbitRadius={15.6} speed={0.23} size={size} orbitTilt={[d(-35), 0, 0]} phase={d(270)} elevation={+0.3} />
        </Planet>
    )
    }
