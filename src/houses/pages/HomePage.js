import React from 'react'

import './HomePage.css'
import HousesList from './HousesList'

export default function HomePage() {
    return (
        <div>
            <h2>Recently added </h2>
        <div className="center-fit">
        <h1>test</h1>
        </div>
        <HousesList nb={10} />
        </div>
    )
}
