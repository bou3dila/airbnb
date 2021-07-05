import React from "react";

import "./SearchBar.css";
export default function SearchBar() {
  return (
    <form action="" method="get">
      <div className="product-search">
        <div className="search-element">
          <label className="search-label">What are you looking for?</label>
          <input
            className="search-input"
            type="text"
            autoComplete="on"
            placeholder="Product Name"
            name="query"
          />
        </div>
        <div className="search-element">
          <label className="search-label">Where are you looking?</label>
          <input
            className="search-input"
            type="text"
            placeholder="City, State"
            autocComplete="on"
            name="location"
          />
        </div>
        <a type="submit" className="search-button">
          Search
        </a>
      </div>
    </form>
  );
}
