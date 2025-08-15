import React from 'react'
import Planet from './Planet'
import * as THREE from 'three'

export default function Venus() {
    return (
    <Planet
        texturePath="/textures/venus.jpg"
        radius={80}
        size={3.5}
        speed={0.30}
        rotationSpeed={0.002}
        orbitTilt={[0, THREE.MathUtils.degToRad(20), 0]}
    />
    )
}