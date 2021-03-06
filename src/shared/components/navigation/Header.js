import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation  } from "react-router-dom";

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
import SearchBar from "../UIElements/SearchBar";
import { AuthContext } from "../../context/auth-context";

export default function Header(props) {
  const location = useLocation();
  const auth = useContext(AuthContext);
  const [logo, setLogo] = useState(desktop_logo);
  const [dropdown, setDropdown] = useState(false);
  const [click, setClick] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [search, setSearch] = useState(false);

  // when the page loads it will detect if its small or big screen
  // to choose the right logo
  useEffect(() => {
    resize();
  }, []);

  // we will open the dropdown menu only when we
  // have a pc size screen
  const onClick = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(!dropdown);
    }
  };

  // closing the dropdown menu and the search bar when clicking outside
  const handleClickOutside = (e) => {
    if (e.target.className !== "dropdown-link") setDropdown(false);
    if (
      e.target.className !== "search-input" &&
      e.target.className !== "search-label" &&
      e.target.className !== "search-button"
    )
      setSearch(false);
  };

  const handleClick = () => {
    setClick(!click);
  };

  // change the icons when the screen shrink or grow
  const resize = () => {
    setDropdown(false);
    if (window.innerWidth > 960) {
      setLogo(desktop_logo);
    } else {
      setLogo(mobile_logo);
    }
  };

  //change the navbar background color before scrolling
  const changeBackground = () => {
    if (window.scrollY > 0) {
      setNavbar(true);
    } else {
      setNavbar(false);
      setSearch(false)
    }
  };

  useEffect(() => {
    
    window.addEventListener("scroll", changeBackground);
    window.addEventListener("resize", resize);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", changeBackground);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className={
           search ? "header active search" : (navbar || (location.pathname!== "/")) ? "header  active" : "header  "
        }
      >
        <Link to="/">
          <img src={logo} className="header__icon" alt="logo" />
        </Link>
        {!search && (navbar || (location.pathname!== "/") ) && (
          <div className="header__center" onClick={() => setSearch(!search)}>
            <input type="text" />
            <SearchIcon />
          </div>
        )}

        <div className={(navbar || (location.pathname!== "/")) ? "header__right  " : "header__right  active"}>
          <Link
            className="header_link"
            to={auth.isLoggedIn ? "/addplace" : "/signup"}
          >
            Become a host
          </Link>

          <LanguageIcon />
          <div className="header__avatar " onClick={onClick}>
            <DehazeIcon className="avatar" />
            <Avatar />
          </div>
          {dropdown && <Dropdown />}
          <div className="menu_icon" onClick={handleClick}>
            {click ? <ClearIcon /> : <DehazeIcon style={(navbar || (location.pathname!== "/"))   ? {"color": "black"} : {"color": "white"} }/>}
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {auth.isLoggedIn && (
              <li>
                <Link
                  className={click ? "nav-links active" : "nav-links"}
                  to="/signup"
                  onClick={() => setClick(false)}
                >
                  Sign up
                </Link>
              </li>
            )}
            {auth.isLoggedIn && (
              <li>
                <Link
                  className={click ? "nav-links active" : "nav-links"}
                  to="/login"
                  onClick={() => setClick(false)}
                >
                  Log in
                </Link>
              </li>
            )}
            {auth.isLoggedIn && (
              <li>
                <Link
                  className={click ? "nav-links active" : "nav-links"}
                  to="/addplace"
                  onClick={() => setClick(false)}
                >
                  Host an experience
                </Link>
              </li>
            )}
            {auth.isLoggedIn && (
              <li>
                <a
                  className={click ? "nav-links active" : "nav-links"}
                  onClick={auth.logout}
                >
                  LOGOUT
                </a>
              </li>
            )}
            <li>
              <Link
                className={click ? "nav-links active" : "nav-links"}
                to="/help"
                onClick={() => setClick(false)}
              >
                Help
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {search && <SearchBar setShow={setSearch} />}
    </>
  );
}
