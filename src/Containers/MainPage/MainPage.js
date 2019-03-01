import React, { Component } from 'react';
import PrimarySearchAppBar from '../../Components/PrimarySearchAppBar/PrimarySearchAppBar.js'
import Select from '../../Components/Select/Select.js'
import CardList from '../../Components/CardList/CardList.js';

class MainPage extends Component {
  render() {
    return (
      <div className="main-page">
        <PrimarySearchAppBar />
        <Select />
        <CardList />
      </div>
    )
  }
}

export default MainPage;