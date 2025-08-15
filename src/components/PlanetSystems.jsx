import React from 'react'
import Mercury from './planets/Mercury'
import Venus from './planets/Venus'
import Mars from './planets/Mars'
import Jupiter from './planets/Jupiter'
import Saturn from './planets/Saturn'
import Uranus from './planets/Uranus'
import Neptune from './planets/Neptune'

export default function PlanetSystems() {
    return (
    <group>
        <Mercury />
        <Venus />
        <Mars />
        <Jupiter />
        <Saturn />
        <Uranus />
        <Neptune />
    </group>
    )
}
