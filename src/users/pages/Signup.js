import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import { createClient } from "contentful-management";
import { client } from "../../client";

import "./Auth.css";

export default function SignUp() {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const client = await createClient({
        accessToken: process.env.REACT_APP_PERSONAL_ACCESS_TOKEN,
      });

      await client
        .getSpace(process.env.REACT_APP_SPACE_ID)
        .then((space) => space.getEnvironment("master"))
        .then((environment) => environment.getEntries())
        .then((entry) => {
          console.log(entry);
        })
        .catch(() => {
          setError(true);
        });
    };
    fetchData();
  }, []);

  const checkMail = async (email) => {
    const query = `{
      userCollection (where: {
        email:"${email}"
      })
        {
        items {
          email
         
        }
      }
    }`;
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
        console.log(data.userCollection.items.length)
        if (errors) {
          console.error(errors);
        }
        if (data.userCollection.items.length > 0) {
          console.log(data.userCollection.items.length)
          return true;
        } else return false;
      });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const x = await checkMail(email);
    if (x) {
      setMsg("email already exist");
      return;
    }
    setMsg("");
    const client = await createClient({
      accessToken: process.env.REACT_APP_PERSONAL_ACCESS_TOKEN,
    });

    await client
      .getSpace("gf1b0zrehy5p")
      .then((space) => space.getEnvironment("master"))
      .then((environment) =>
        environment.createEntry("user", {
          fields: {
            email: { "en-US": email },
            password: { "en-US": password },
            name: { "en-US": name },
          },
        })
      )
      .then((entry) => {
        auth.login(entry.fields.email);
        entry.publish();
        setError(false);
      })
      .catch(() => {
        setError(true);
      });
  };

  //disable scrolling
  // window.onscroll = function () {
  //   window.scrollTo(0, 0);
  // };
  return (
    <div className="auth_card">
      <div className="card-content">
        <div className="card-title">
          <h2>SIGN UP</h2>
          <div className="underline-title"></div>
        </div>
        <form onSubmit={onSubmitHandler} className="form">
          <label htmlFor="user-name" style={{ paddingTop: "13px" }}>
            &nbsp;Name
          </label>
          <input
            className="form-content"
            type="text"
            name="name"
            autoComplete="on"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="form-border"></div>
          <label htmlFor="user-email" style={{ paddingTop: "13px" }}>
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
          <label htmlFor="user-password" style={{ paddingTop: "22px" }}>
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
          <p className="error">{msg}</p>
          <input
            className="submit-btn"
            type="submit"
            name="submit"
            value="LOGIN"
          />
          <Link to="/login" className="signup">
            Already have an account ?
          </Link>
        </form>
      </div>
    </div>
  );
}
