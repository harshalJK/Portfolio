    // src/components/planets/Jupiter.jsx
    import React from 'react'
    import Planet from './Planet'
    import * as THREE from 'three'
    import SkillsCube from '../../SkillsCube'

    const d = THREE.MathUtils.degToRad

    export default function Jupiter() {
    return (
        <Planet
        texturePath="/textures/jupiter.jpg"
        radius={200}
        size={9}
        speed={0.10}
        rotationSpeed={0.001}
        orbitTilt={[0, d(40), 0]}
        >
        {/* Ring A (inner) */}
        <SkillsCube texturePath="/textures/Docker.png"      orbitRadius={12.0} speed={0.16} size={2.0} orbitTilt={[d(-18), 0, 0]} phase={d(  0)} elevation={+0.5} />
        <SkillsCube texturePath="/textures/Kubernetes.png"  orbitRadius={12.0} speed={0.16} size={2.0} orbitTilt={[d(-18), 0, 0]} phase={d(120)} elevation={+0.5} />
        <SkillsCube texturePath="/textures/Jenkins.png"     orbitRadius={12.0} speed={0.16} size={2.0} orbitTilt={[d(-18), 0, 0]} phase={d(240)} elevation={+0.5} />

        {/* Ring B (middle) */}
        <SkillsCube texturePath="/textures/Git.png"         orbitRadius={13.2} speed={0.18} size={2.0} orbitTilt={[d(12),  0, 0]} phase={d( 30)} elevation={ 0.0} />
        <SkillsCube texturePath="/textures/Terraform.png"   orbitRadius={13.2} speed={0.18} size={2.0} orbitTilt={[d(12),  0, 0]} phase={d(210)} elevation={ 0.0} />

        {/* Ring C (outer) */}
        <SkillsCube texturePath="/textures/Kafka.png"       orbitRadius={14.4} speed={0.21} size={2.0} orbitTilt={[d(36),  0, 0]} phase={d( 90)} elevation={-0.5} />
        <SkillsCube texturePath="/textures/Spark.png"       orbitRadius={14.4} speed={0.21} size={2.0} orbitTilt={[d(36),  0, 0]} phase={d(270)} elevation={-0.5} />
        </Planet>
    )
    }
