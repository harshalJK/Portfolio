import React from 'react'
import Planet from './Planet'
import * as THREE from 'three'

export default function Neptune() {
    return (
    <Planet
        texturePath="/textures/neptune.jpg"
        radius={350}
        size={6}
        speed={0.04}
        rotationSpeed={0.002}
        orbitTilt={[0, THREE.MathUtils.degToRad(70), 0]}
    />
    )
}