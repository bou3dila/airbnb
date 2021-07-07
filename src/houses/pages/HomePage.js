import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../shared/components/UIElements/SearchBar";
import City from "../components/City";
import {cities } from '../components/cities'

import "./HomePage.css";
import HousesList from "./HousesList";

export default function HomePage() {


    
  const [search, setSearch] = useState(true);

  const changeBackground = () => {
    if (window.scrollY > 0) {
      setSearch(false);
    } else {
      setSearch(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);
  return (
    <div>
      <div className="center-fit"></div>

      {search && (
        <SearchBar
          setShow={() => console.log("nothing")}
          style={{ zIndex: 5, marginTop: "-25vh" }}
        />
      )}
      <h2 className="button_title">Not sure where to go? Perfect!</h2>

      <Link to="/flexible/any/places">
        <button className="button">I'm flexible</button>
      </Link>
      <h2 className="cities-title">Explore nearby</h2>
      <div className="cities-container">
        {cities.map((city,index) => <City key={index} city={city} />)}
      </div>
      <h2 className="houselist-title"> Recently Added</h2>
        <HousesList nb={50} />
    </div>
  );
}
