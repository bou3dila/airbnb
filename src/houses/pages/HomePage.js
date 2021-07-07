import React, { useEffect, useState } from "react";
import SearchBar from "../../shared/components/UIElements/SearchBar";

import "./HomePage.css";
import HousesList from "./HousesList";

export default function HomePage() {
  const [search, setSearch] = useState(true);

  const changeBackground = () => {
    if (window.scrollY > 0) {
      setSearch(false);
    } else {
      setSearch(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);
  return (
    <div>
      <div className="center-fit"></div>

      {search && (
        <SearchBar
          setShow={() => console.log("nothing")}
          style={{ zIndex: 5, marginTop: "-25vh" }}
        />
      )}
      <h2 className="button_title">Not sure where to go? Perfect!</h2>

      <button  className="button">
        I'm flexible
      </button>
      <div style={{ marginTop: "100vh" }}>
        <HousesList nb={50} />
      </div>
    </div>
  );
}
