import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./App.css";
import HousesList from "./houses/pages/HousesList";
import Header from "./shared/components/navigation/Header";
import Footer from "./shared/components/navigation/Footer";
import Login from "./users/pages/Login";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import SignUp from "./users/pages/Signup";
import NewHouse from "./houses/pages/NewHouse";
import HomePage from "./houses/pages/HomePage";
import HousePage from "./houses/pages/HousePage";

function App() {

  const {login, logout, uid} = useAuth();

  let routes;

  if(!!uid  ){
    routes = (<Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      
      <Route path="/:location/:name/places" exact>
        <h2> Your search result </h2>
        <HousesList />
      </Route>
      <Route path="/addplace" exact>
        <NewHouse />
      </Route>
      <Route path="/:houseId/house" exact>
        <HousePage  />
      </Route>
      <Route path="/:mail/places" exact>
        <h2> Your search result </h2>
        <HousesList />
      </Route>
      <Redirect to="/" />
    </Switch>)
  }
  else{
    routes =(<Switch>
      <Route path="/" exact>
      <HomePage />
      </Route>
      <Route path="/:houseId/house" exact>
        <HousePage  />
      </Route>
      <Route path="/addplace" exact>
      {/* <Redirect to="/" /> */}
      </Route>
      <Route path="/:mail/places" exact>
        <h2> Your search result </h2>
        <HousesList />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/signup" exact>
        <SignUp />
      </Route>
      <Route path="/:location/:name/places" exact>
        <h2> Your search result </h2>
        <HousesList />
      </Route>
      <Redirect to="/" />
    </Switch>)
  }

  return (
      <AuthContext.Provider
        value={{
          isLoggedIn: !!uid,
          uid: uid,
          login: login,
          logout: logout,
        }}
      >
        <Router>
          <Header />
          <main className="container">
            {routes}
          </main>
        </Router>
        <Footer />
      </AuthContext.Provider>
  );
}

export default App;
