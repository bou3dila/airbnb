import React from 'react';
import './App.css';

import HousesList from './houses/pages/HousesList';

function App() {

 

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
          <HousesList />
        </main>
      </div>
      
    </div>
  );
}

export default App;
