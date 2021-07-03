import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import desktop_logo from "./logo.png";
import mobile_logo from "./mobile_logo.png";
import SearchIcon from "@material-ui/icons/Search";
import DehazeIcon from "@material-ui/icons/Dehaze";
import LanguageIcon from "@material-ui/icons/Language";
import Dropdown from "./Dropdown";
import { Avatar } from "@material-ui/core";

import "./Header.css";

export default function Header(props) {
  const [logo, setLogo] = useState(desktop_logo);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    resize();
  }, []);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(!dropdown);
    }
  };

  const handleClickOutside = (e) => {
      if( e.target.className !== "dropdown-link")
            setDropdown(false);
  };

  const resize = () => {
    if (window.innerWidth > 960) {
      setLogo(desktop_logo);
    } else {
      setLogo(mobile_logo);
    }
  };

  window.addEventListener("resize", resize);
  document.addEventListener("mousedown", handleClickOutside);
  return (
    <div className="header">
      <Router>
        <img src={logo} className="header__icon" alt="logo" />
        <div className="header__center">
          <input type="text" />
          <SearchIcon />
        </div>

        <div className="header__right">
          <p>Become a host </p>

          <LanguageIcon />
          <div className="header__avatar" onClick={onMouseEnter}>
            <DehazeIcon />
            <Avatar />
          </div>
          {dropdown && <Dropdown />}
        </div>
      </Router>
    </div>
  );
}
