import React from 'react';

import './SideDrawer.scss';


const sideDrawer = props => {
  let drawerClasses = props.show ? 'side-drawer open' : 'side-drawer';
  return (
    <nav className={drawerClasses}>
      <ul>
        <li><a href="/">Main Page</a></li>
        <li><a href="/">Sign Up</a></li>
        <li><a href="/">Sign In</a></li>
        <li><a href="/">Profile</a></li>
      </ul>
    </nav>
  )
};

export default sideDrawer;
