import React from 'react'
import Planet from './Planet'
import * as THREE from 'three'

export default function Jupiter() {
    return (
    <Planet
        texturePath="/textures/jupiter.jpg"
        radius={200}
        size={9}
        speed={0.10}
        rotationSpeed={0.001}
        orbitTilt={[0, THREE.MathUtils.degToRad(40), 0]}
    />
    )
}