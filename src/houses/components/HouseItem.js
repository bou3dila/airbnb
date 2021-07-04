

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './HouseItem.css';



  export default function HouseItem({item}) {
  
    return (
      <Card className="card">
        <CardActionArea>
          <CardMedia
            className="media"
            image={item.featuredimage[0].fields.file.url}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {item.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {item.description.length > 50 && item.description.substring(0,80)}...
            {item.description.length <= 50 && item.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  }
