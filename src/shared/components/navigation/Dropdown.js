import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MenuItems } from './MenuItems'
import "./Dropdown.css";
import { AuthContext } from "../../context/auth-context";

function Dropdown() {

    const auth = useContext(AuthContext);
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return(
        <>
        <ul onClick={handleClick} className={click? 'dropdown-menu clicked' : 'dropdown-menu'}>
        {!auth.isLoggedIn &&(
            <li>
              <Link
                className='dropdown-link'
                to="/signup"
                onClick={() => setClick(false)}
              >
                Sign up
              </Link>
            </li>
          )}
            {!auth.isLoggedIn &&(
            <li>
              <Link
                className='dropdown-link'
                to="/login"
                onClick={() => setClick(false)}
              >
                Log in
              </Link>
            </li>)}
            {auth.isLoggedIn &&(
            <li>
              <Link
                className='dropdown-link'
                to="/HosExperience"
                onClick={() => setClick(false)}
              >
                Host an experience
              </Link>
            </li>)}
            {auth.isLoggedIn &&(<li>
              <Link
                className='dropdown-link'
                to="/logout"
                onClick={() => {setClick(false); auth.logout()}}
              >
                Log Out
              </Link>
            </li>)}
            <li>
              <Link
                className='dropdown-link'
                to="/help"
                onClick={() => setClick(false)}
              >
                Help
              </Link>
            </li>

        </ul>
        </>
    )
}
export default Dropdown;