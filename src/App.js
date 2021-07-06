import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useState, useContext } from "react";

import "./App.css";
import HousesList from "./houses/pages/HousesList";
import Header from "./shared/components/navigation/Header";
import Login from "./users/pages/Login";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import SignUp from "./users/pages/Signup";
import NewHouse from "./houses/pages/NewHouse";

function App() {

  const auth = useContext(AuthContext);
  const {login, logout, email} = useAuth();

  let routes;

  if(!!email  ){
    routes = (<Switch>
      <Route path="/" exact>
        <h2>Recently added </h2>
        <HousesList nb={10} />
      </Route>
      
      <Route path="/:location/:name/places" exact>
        <h2> Your search result </h2>
        <HousesList />
      </Route>
      <Route path="/addplace" exact>
        <NewHouse />
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
        <h2>Recently added </h2>
        <HousesList nb={10} />
      </Route>
      <Route path="/addplace" exact>
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
          isLoggedIn: !!email,
          email: email,
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
      </AuthContext.Provider>
  );
}

export default App;
