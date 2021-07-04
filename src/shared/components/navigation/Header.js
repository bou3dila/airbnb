import React, { useState, useEffect } from "react";
import {  Link } from "react-router-dom";

import desktop_logo from "./logo.png";
import mobile_logo from "./mobile_logo.png";
import SearchIcon from "@material-ui/icons/Search";
import DehazeIcon from "@material-ui/icons/Dehaze";
import LanguageIcon from "@material-ui/icons/Language";
import Dropdown from "./Dropdown";
import { Avatar } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { MenuItems } from "./MenuItems";

import "./Header.css";

export default function Header(props) {
  const [logo, setLogo] = useState(desktop_logo);
  const [dropdown, setDropdown] = useState(false);
  const [click, setClick] = useState(false);

  useEffect(() => {
    resize();
  }, []);

  const closeMobileMenu = () => {
    setClick(false);
  };

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(!dropdown);
    }
  };

  const handleClickOutside = (e) => {
    if (e.target.className !== "dropdown-link") setDropdown(false);
  };

  const handleClick = () => {
    setClick(!click);
  };

  const resize = () => {
    setDropdown(false);
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
        <img src={logo} className="header__icon" alt="logo" />
        <div className="header__center">
          <input type="text" />
          <SearchIcon />
        </div>

        <div className="header__right">
          <p>Become a host </p>

          <LanguageIcon />
          <div className="header__avatar " onClick={onMouseEnter}>
            <DehazeIcon className="avatar" />
            <Avatar />
          </div>
          {dropdown && <Dropdown />}
          <div className="menu_icon" onClick={handleClick}>
            {click ? <ClearIcon /> : <DehazeIcon />}
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {MenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    className={click ? "nav-links active" : "nav-links"}
                    to={item.path}
                    onClick={() => setClick(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
    </div>
  );
}
