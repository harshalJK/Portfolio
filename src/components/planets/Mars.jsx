    import React from 'react'
    import Planet from './Planet'
    import * as THREE from 'three'
    import SkillsCube from '../../SkillsCube'

    const d = THREE.MathUtils.degToRad

    export default function Mars() {
    const size = 1.7 // slightly smaller to reduce visual overlap
    return (
        <Planet
        texturePath="/textures/mars.jpg"
        radius={150}
        size={3}
        speed={0.21}
        rotationSpeed={0.004}
        orbitTilt={[0, d(30), 0]}
        >
        {/* Ring A (tilt -20°): slightly inner, a bit slower, elevated +0.6 */}
        <SkillsCube texturePath="/textures/SCRUM.png"        orbitRadius={9.4} speed={0.17} size={size} orbitTilt={[d(-20), 0, 0]} phase={d(  0)} elevation={+0.6} />
        <SkillsCube texturePath="/textures/OOP.png"          orbitRadius={9.4} speed={0.17} size={size} orbitTilt={[d(-20), 0, 0]} phase={d(120)} elevation={+0.6} />
        <SkillsCube texturePath="/textures/UnitTest.png"     orbitRadius={9.4} speed={0.17} size={size} orbitTilt={[d(-20), 0, 0]} phase={d(240)} elevation={+0.6} />

        {/* Ring B (tilt +10°): middle radius, medium speed, elevation 0 */}
        <SkillsCube texturePath="/textures/Microservices.png" orbitRadius={10.0} speed={0.19} size={size} orbitTilt={[d(10), 0, 0]} phase={d( 60)} elevation={0.0} />
        <SkillsCube texturePath="/textures/RestApi.png"       orbitRadius={10.0} speed={0.19} size={size} orbitTilt={[d(10), 0, 0]} phase={d(240)} elevation={0.0} />

        {/* Ring C (tilt +45°): slightly outer, fastest, elevated -0.6 */}
        <SkillsCube texturePath="/textures/CICD.png"          orbitRadius={10.6} speed={0.23} size={size} orbitTilt={[d(45), 0, 0]} phase={d(150)} elevation={-0.6} />
        <SkillsCube texturePath="/textures/Agile.png"         orbitRadius={10.6} speed={0.23} size={size} orbitTilt={[d(45), 0, 0]} phase={d(330)} elevation={-0.6} />
        </Planet>
    )
    }
