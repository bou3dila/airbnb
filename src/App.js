
import { BrowserRouter as Router } from "react-router-dom"


import './App.css';
import Header from './shared/components/navigation/Header';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Header />
        <main>
          
        </main>
      </Router>
    </div>
  );
}

export default App;
