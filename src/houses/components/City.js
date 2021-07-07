import React from "react";
import { Link } from "react-router-dom";
import "./City.css";

export default function City({city}) {
  return (
    <Link to={city.link} className="city-container">
      <img
        className="img-icon"
        src={city.img}
        alt=""
      />
      <h4>{city.name}</h4>
    </Link>
  );
}
