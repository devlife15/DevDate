import React from "react";
import { Link } from "react-router-dom";

const NavbarAuth = () => {
  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">DevDate</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>Safety</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <a>Community Guidelines</a>
                  </li>
                  <li>
                    <a>Safety & Policy</a>
                  </li>
                  <li>
                    <a>Safety & Reporting</a>
                  </li>
                  <li>
                    <a>Safety Tips</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavbarAuth;
