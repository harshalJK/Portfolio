import React from 'react'
import Planet from './Planet'
import * as THREE from 'three'

export default function Uranus() {
    return (
    <Planet
        texturePath="/textures/uranus.jpg"
        radius={300}
        size={6}
        speed={0.06}
        rotationSpeed={0.002}
        orbitTilt={[0, THREE.MathUtils.degToRad(60), 0]}
    />
    )
}