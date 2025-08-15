import React from 'react'
import Planet from './Planet'
import * as THREE from 'three'

export default function Saturn() {
    return (
    <Planet
        texturePath="/textures/saturn.jpg"
        radius={250}
        size={7}
        speed={0.1}
        rotationSpeed={0.001}
        orbitTilt={[0, THREE.MathUtils.degToRad(50), 0]}
        ring={{ texturePath: '/textures/saturn_ring.png', innerRadius: 9, outerRadius: 20 }}
    />
    )
}