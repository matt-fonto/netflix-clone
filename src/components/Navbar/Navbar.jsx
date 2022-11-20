import React, { useEffect, useState } from "react";
import logo from "../../resources/netflix-logo.png";
import "./styles.css";

const Navbar = () => {
  const [navBackground, setNavBackground] = useState(false);

  // useEffect is great for pieces of code to run in a given condition
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

  return (
    <nav className={navBackground ? "nav nav_background" : "nav"}>
      <div className="nav-right">
        <img className="nav_logo" src={logo} alt="logo" />

        {/* links */}
        <div className="nav_links">
          <ul>
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">TV Shows</a>
            </li>
            <li>
              <a href="">Movies</a>
            </li>
            <li>
              <a href="">New & Popular</a>
            </li>
            <li>
              <a href="">My List</a>
            </li>
            <li>
              <a href="">Browse by Languages</a>
            </li>
          </ul>
        </div>
      </div>

      {/* User Logo - nav left */}
      <img
        className="nav_avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="user-logo"
      />
    </nav>
  );
};

export default Navbar;
