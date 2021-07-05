import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import "./HouseItem.css";

export default function HouseItem({ item }) {
  return (
    <div className="card">
      <img src={item.featuredimageCollection.items[0].url} alt ="" />
      <div className="card__info">
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
