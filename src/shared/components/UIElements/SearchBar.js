import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./SearchBar.css";
export default function SearchBar({setShow}) {

    const [place, setPlace] = useState("flexible");
    const [name, setName] = useState("any");

    let history = useHistory();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(name === ""){
            setName("any")
        }
        console.log(name)
        history.push(`/${place}/${name}/places`)
        setShow(false);
    }

  return (
    <form onSubmit={ onSubmitHandler}>
      <div className="product-search">
        <div className="search-element">
          <label className="search-label">What are you looking for?</label>
          <input
            className="search-input"
            type="text"
            autoComplete="on"
            placeholder="Product Name"
            value={name === "any" ? "" : name}
            onChange={(e) => setName(e.target.value)}
            
          />
        </div>
        <div className="search-element">
          <label className="search-label">Where are you looking?</label>
          <select
            className="search-input"
            name="location"
            onChange={(e) => setPlace(e.target.value)}
            value={place}
          >
            <option value="flexible">I'm flexible</option>
            <option value="Al Marsa">Al Marsa</option>
            <option value="Hammamet">Hammamet</option>
            <option value="Tunis">Tunis</option>
            <option value="Hergla">Hergla</option>
          </select>
        </div>
        <input type="submit" className="search-button" value="Search" />
      </div>
    </form>
  );
}
