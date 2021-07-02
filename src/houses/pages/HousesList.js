import React, { useState, useEffect} from 'react'

import {client} from '../../client';
import HouseItem from '../components/HouseItem';

export default function HousesList() {
    const [articles, setArticles] = useState([]);
    
  useEffect(()=>{
    client.getEntries()
    .then((response)=>{
      setArticles(response.items)
    })
    .catch(console.error)
  }, [])

    return (
        <div>
            {articles.map((item, index)=>
                <HouseItem item={item} key={index} />
            )}
        </div>
    )
}
