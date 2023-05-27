// react packages
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// hooks
import { useTheme } from "../hooks/useTheme";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import Avatar from "./Avatar";

import "./Navbar.css";

export default function Navbar({ mobileMenu, setMobileMenu, screenWidth }) {
  const { mode } = useTheme();
  const { user } = useAuthContext();
  const history = useHistory();

  return (
    <div className={`navbar ${mode}`}>
      {!mobileMenu && screenWidth < 501 && (
        <button
          className="hamburger"
          onClick={() => {
            setMobileMenu(true);
          }}
        >
          <i className="fi fi-br-menu-burger"></i>
        </button>
      )}
      <header>
        <button className="searchButton">
          <i className="fi fi-br-search"></i>
        </button>

        <form className="search">
          <input type="text" placeholder="search" />
        </form>

        <button className="notification">
          <i className="fi fi-br-bell-ring"></i>
        </button>

        <Link to="/settings">
          <Avatar src={user.photoURL} />
        </Link>
      </header>
    </div>
  );
}
