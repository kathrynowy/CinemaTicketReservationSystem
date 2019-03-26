import React from 'react';
import { Link } from "react-router-dom";

import './SideDrawer.scss';


const sideDrawer = props => {
  let drawerClasses = props.show ? 'side-drawer open' : 'side-drawer';
  return (
    <nav className={drawerClasses}>
      <ul>
        <li><Link to={{ pathname: "/" }}>Main Page</Link></li>
        <li><Link to={{ pathname: "/sign-in" }}>Sign In</Link></li>
        <li><Link to={{ pathname: "/sign-up" }}>Sign Up</Link></li>
        <li><a href="/">Profile</a></li>
      </ul>
    </nav>
  )
};

export default sideDrawer;
