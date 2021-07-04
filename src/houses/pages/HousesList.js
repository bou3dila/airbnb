import React, { useState, useEffect } from "react";

import { client } from "../../client";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import HouseItem from "../components/HouseItem";

export default function HousesList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouses = async () => {
      await client
        .getEntries()
        .then((response) => {
          setArticles(response.items);
        })
        .catch(console.error);
    };
    fetchHouses();
    setLoading(false);
  }, []);

  return (
    <>
    {loading ? <div className="center"> <LoadingSpinner /> </div> :<div>
        {articles.map((item, index) => (
          <HouseItem item={item.fields} key={index} />
        ))}
      </div> }
      
    </>
  );
}
