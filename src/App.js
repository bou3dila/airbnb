import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./App.css";
import HousesList from "./houses/pages/HousesList";
import Header from "./shared/components/navigation/Header";
import Auth from "./users/pages/Auth";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="container">
          <Switch>
            <Route path="/" exact>
              <h2>Recently added </h2>
              <HousesList nb={10} />
            </Route>

            <Route path="/:location/:name/places" exact>
              <h2> Your search result </h2>
              <HousesList />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
