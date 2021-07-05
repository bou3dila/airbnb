
import { BrowserRouter as Router } from "react-router-dom"


import './App.css';
import HousesList from "./houses/pages/HousesList";
import Header from './shared/components/navigation/Header';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Header />
        <main className="container">
        <h2>Recently added </h2>
          <HousesList nb={5} />
        </main>
      </Router>
    </div>
  );
}

export default App;
