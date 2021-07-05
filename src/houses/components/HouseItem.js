import React from "react";

import "./HouseItem.css";

export default function HouseItem({ item }) {
  return (
    <div className="card">
      <img src={item.featuredimageCollection.items[0].url} alt ="" />
      <div className="card__info">
        <h3>{item.city}</h3>
      <h2>{item.name}</h2>
                <h4>{item.description.length > 30 &&
                item.description.substring(0, 30)}
              ...
              {item.description.length <= 30 && item.description}</h4>
                <h3>{item.price}$/Night</h3>
      </div>
       
    </div>
  );
}
