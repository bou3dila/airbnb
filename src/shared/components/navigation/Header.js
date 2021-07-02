import React, { useState, useEffect } from "react";

import desktop_logo from "./logo.png";
import mobile_logo from "./mobile_logo.png";
import SearchIcon from "@material-ui/icons/Search"
import DehazeIcon from '@material-ui/icons/Dehaze';
import LanguageIcon from "@material-ui/icons/Language"
import { Avatar } from "@material-ui/core"

import "./Header.css";

export default function Header(props) {

    const [logo, setLogo] = useState(desktop_logo);

    useEffect(()=>{
        resize();
    },[])
    const resize = () =>{
        if(window.innerWidth > 960){
            setLogo(desktop_logo)
        }else {
            setLogo(mobile_logo)
        }
    }

    window.addEventListener('resize', resize)
  return (
    <div className="header">
      <img src={logo} className="header__icon" alt="logo" />
      <div className='header__center'>
          <input type="text" />
          <SearchIcon />
      </div>

      <div className='header__right'>
          <p>Become a host </p>
          
          <LanguageIcon />
          <div className='header__avatar'>
          <DehazeIcon  />
          <Avatar />
          </div>
      </div>
    </div>
  );
}
