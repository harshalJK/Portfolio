import React from 'react'
import Planet from './Planet'
import * as THREE from 'three'

export default function Mars() {
    return (
    <Planet
        texturePath="/textures/mars.jpg"
        radius={150}
        size={3}
        speed={0.21}
        rotationSpeed={0.004}
        orbitTilt={[0, THREE.MathUtils.degToRad(30), 0]}
    />
    )
}