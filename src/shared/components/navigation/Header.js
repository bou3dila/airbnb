import React, { useState, useEffect } from "react";

import desktop_logo from "./logo.png";
import mobile_logo from "./mobile_logo.png";

import "./Header.css";

export default function Header(props) {

    const [logo, setLogo] = useState(desktop_logo);

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
      <img src={ window.innerWidth > 960 ? logo : mobile_logo} className="header__icon" alt="logo" />
      <div className='header__center'>
          <input type="text" />

      </div>
    </div>
  );
}
