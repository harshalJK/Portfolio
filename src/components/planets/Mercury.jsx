import React from 'react'
import Planet from './Planet'
import * as THREE from 'three'

export default function Mercury() {
    return (
    <Planet
        texturePath="/textures/mercury.jpg"
        radius={50}
        size={2}
        speed={0.66}
        rotationSpeed={0.006}
        orbitTilt={[THREE.MathUtils.degToRad(10), 0, 0]}
    />
    )
}