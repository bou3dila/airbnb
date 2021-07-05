import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../../shared/context/auth-context'

import "./Auth.css";

export default function Login() {
    const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false)

  const onSubmitHandler = async (e) => {
    const query = `{
        userCollection (where: {
          AND: [
          {email:"${email}"}, 
          {password: "${password}"}
            ]
        })
          {
          items {
            email
            password
           
          }
        }
      }`;
    e.preventDefault();
    await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_SPACE_ID}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authenticate the request
          Authorization: "Bearer " + process.env.REACT_APP_ACCESS_TOKEN,
        },
        // send the GraphQL query

        body: JSON.stringify({ query }),
      }
    )
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }
        if(data.userCollection.items.length >0){
            auth.login(data.userCollection.items[0].email)
            setError(false)
        }
        else
            setError(true)
      });
  };

  //disable scrolling
  window.onscroll = function () {
    window.scrollTo(0, 0);
  };
  return (
    <div className="auth_card">
      <div className="card-content">
        <div className="card-title">
          <h2>LOGIN</h2>
          <div className="underline-title"></div>
        </div>
        <form onSubmit={onSubmitHandler} className="form">
          <label htmlFor="user-email" style={{ "paddingTop": "13px" }}>
            &nbsp;Email
          </label>
          <input
            className="form-content"
            type="email"
            name="email"
            autoComplete="on"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <div className="form-border"></div>
          <label htmlFor="user-password" style={{ "paddingTop": "22px" }}>
            &nbsp;Password
          </label>
          <input
            id="user-password"
            className="form-content"
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="form-border"></div>
          <a href="#">
            <legend className="forgot-pass">Forgot password?</legend>
          </a>
           <p className={error ? "error": "hidden"}>Email or password incorrect</p> 
          <input
            className="submit-btn"
            type="submit"
            name="submit"
            value="LOGIN"
          />
          <Link to="/signup" className="signup">
            Don't have account yet?
          </Link>
        </form>
      </div>
    </div>
  );
}
