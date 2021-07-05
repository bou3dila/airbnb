import React, { useState, useEffect } from "react";
import {useParams } from 'react-router-dom'
//  import { client } from "../../client";
// import { createClient } from "contentful-management";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import HouseItem from "../components/HouseItem";
import "./HousesList.css";

export default function HousesList(props) {
  const [articles, setArticles] = useState();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(`{
    houseCollection  {
      items {
        name
        city
        featuredimageCollection {
          items {
            url
          }
        }
        description
        price
      }
    }
  }`)



 
  const {name, location} = useParams();
  //Fetching the data with graphql
  
    useEffect(() => {
      const fetchHouses = async () => {
        if(props.nb){
          setQuery(`{
            houseCollection (limit: ${props.nb}) {
              items {
                name
                city
                featuredimageCollection {
                  items {
                    url
                  }
                }
                description
                price
              }
            }
          }`)
        }
        else{
          if(location !== "flexible" && name === "any"  ){
            setQuery(`{
              houseCollection (where: {city_contains: "${location}"}){
                items {
                  name
                  city
                  featuredimageCollection {
                    items {
                      url
                    }
                  }
                  description
                  price
                }
              }
            }`)
          }
          else if(location === "flexible" && name !== "any" ){
            setQuery(`{
              houseCollection (where: {name_contains: "${name}"}){
                items {
                  name
                  city
                  featuredimageCollection {
                    items {
                      url
                    }
                  }
                  description
                  price
                }
              }
            }`)
          }
          else if(location !== "flexible" && name !== "any" ){
            setQuery(`{
              houseCollection(where: {
                AND: [
                {city_contains: "${location}"},
                {name_contains: "${name}"}
                ]}) 
                {
                items {
                  name
                  city
                  featuredimageCollection {
                    items {
                      url
                    }
                  }
                  description
                  price
                }
              }
            }
            `)
          }
        }
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

            // rerender the entire component with new data
            // We will only show the first nb items
            setArticles(data.houseCollection.items);
            setLoading(false);
          });
      };
      fetchHouses();
    }, [query, location, name]);

  // useEffect( async () => {
  //   const client =  await createClient({
  //       accessToken: REACT_APP_PERSONAL_ACCESS_TOKEN
  //     })

  //     await client.getSpace('gf1b0zrehy5p')
  //     .then((space) => space.getEnvironment('master'))
  //     .then((environment) => environment.createEntry('user', {
  //       fields: {

  //               email: {'en-US': 'fhjkbhjbvkbdsa'},
  //               password: {'en-US': 'bou3dila'}

  //       }
  //     }))
  //     .then((entry) => entry.publish())
  //     .catch(console.error)

  // }, []);

  return (
    <>
      {loading ? (
        <div className="center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
        {articles.length > 0 ?
          <div className="flex-container">
            {articles.map((item, index) => (
              <HouseItem item={item} key={index} />
            ))}
          </div> :
          <h2>No items founds</h2>
}
          
        </>
      )}
    </>
  );
}
