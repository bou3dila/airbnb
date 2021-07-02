import React, { useEffect } from 'react'

export default function HouseItem({item}) {

    useEffect(() => {
        const {name, featuredimage, description, price } = item.fields;
        console.log(featuredimage)
        
    }, [item])

    

    return (
        <div>
            <h1>hi</h1>
        </div>
    )
}
