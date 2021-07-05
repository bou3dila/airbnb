import React, { useState, useEffect } from "react";

 import { client } from "../../client";
import { createClient } from "contentful-management";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import HouseItem from "../components/HouseItem";
import "./HousesList.css";

export default function HousesList({ nb }) {
  const [articles, setArticles] = useState();
  const [loading, setLoading] = useState(true);

  const query = `
  {
    houseCollection {
      items {
        name
        featuredimageCollection {
          items {
            url
          }
        }
        description
        price
      }
    }
  }`;

    useEffect(() => {
      const fetchHouses = async () => {
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
            setArticles(data.houseCollection.items);
            setLoading(false);
          });
      };
      fetchHouses();
    }, []);

  // useEffect( async () => {
  //   const client =  await createClient({
  //       accessToken: 'CFPAT-dg8rSsW-Mfzo-9BhP8wgupsP2HXnMdfZpK59a2Vp2mU'
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
      {!articles ? (
        <div className="center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="flex-container">
            {articles.map((item, index) => (
              <HouseItem item={item} key={index} />
            ))}
          </div>
          
        </>
      )}
    </>
  );
}
