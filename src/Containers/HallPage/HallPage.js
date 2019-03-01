import React, { Component } from 'react';
import PrimarySearchAppBar from '../../Components/PrimarySearchAppBar/PrimarySearchAppBar.js'
import Hall from '../../Components/Hall/Hall.js'

class HallPage extends Component {
  render() {
    return (
      <div className="hall-page">
        <PrimarySearchAppBar />
        <Hall />
      </div>
    )
  }
}

export default HallPage;