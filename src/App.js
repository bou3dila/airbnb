
import { BrowserRouter as Router } from "react-router-dom"


import './App.css';
import HousesList from "./houses/pages/HousesList";
import Header from './shared/components/navigation/Header';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Header />
        <main>
          <HousesList />
        </main>
      </Router>
    </div>
  );
}

export default App;
