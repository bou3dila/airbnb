import React, { useEffect, useState } from 'react';
import './App.css';
import {client} from './client';

function App() {

  const [articles, setArticles] = useState([]);

  useEffect(()=>{
    client.getEntries()
    .then((response)=>{
      console.log(response)
    })
    .catch(console.error)
  })

  return (
    <div className="App">
      <div className='container'>
        <header>
          <div className="wrapper">
            <span>React and contentful</span>
          </div>
        </header>
        <main>
          <div className="wrapper"></div>
        </main>
      </div>
      
    </div>
  );
}

export default App;
