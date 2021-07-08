import React from "react";

import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import { useEffect } from "react";
import { useState } from "react";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useParams } from "react-router-dom";
export default function HousePage() {
  const [item, setItem] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  const { houseId } = useParams();

  let query = `
  {
    houseCollection(where: {sys:{id: "${houseId}"}}){
      items{
        name,
        city,
        description,
        featuredimageCollection{
          items{
            url,
            title,
            

          },
        }
        price,
          owner{
              sys{
                  id
              }
          
          
        }
        sys{
          id
        }
      }
    }
  }
  `;

  //wait until to house fetch to fetch
  //user's data

  useEffect(() => {
    const fetchUser = async () => {
      if (!!item) {
        query = `{
            userCollection(where: {sys:{id: "${item.owner.sys.id}"}}){
            items{
              name
            }
          }
        }`;
        fetch(
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
            setUser(data.userCollection.items[0].name);
            // rerender the entire component with new data
            // We will only show the first nb items
            setLoading(false);
          });
      }
    };

    fetchUser();
    
  }, [item]);

  //fetching house's data
  useEffect(() => {
    query = `
  {
    houseCollection(where: {sys:{id: "${houseId}"}}){
      items{
        name,
        city,
        description,
        featuredimageCollection{
          items{
            url,
            title,
            

          },
        }
        price,
          owner{
              sys{
                  id
              }
          
          
        }
        sys{
          id
        }
      }
    }
  }
  `;
    const fetchData = async () => {
      setLoading(true);

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
          
   
          setItem();
          console.log(item)
          console.log(data.houseCollection.items[0])
        });
    };

    fetchData();
    setLoading(false);
  }, [houseId]);
  return (
    <>
      {loading || !!item === false ? (
        <LoadingSpinner />
      ) : (
        <div>
          <h1>
            {item.name}
            {item.city}
          </h1>
          <h3>{item.city}</h3>
          <ImageList
            sx={{ width: 500, height: 450 }}
            variant="masonry"
            cols={3}
            gap={8}
          >
            {item.featuredimageCollection &&
              item.featuredimageCollection.items.map((item) => (
                <ImageListItem key={item.title}>
                  <img srcSet={item.url} alt={item.title} loading="lazy" />
                </ImageListItem>
              ))}
          </ImageList>
          <h2>
            {item.name} hosted by {user}
          </h2>
          <div >
            <p style={{ "maxWidth": "50vw", "marginRight":"10vw" }}>{item.description}</p>
          </div>
          <h2>{item.price}$/ night</h2>
        </div>
      )}
    </>
  );
}
