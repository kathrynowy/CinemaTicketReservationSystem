import React, { Component } from 'react';
import PrimarySearchAppBar from './Components/PrimarySearchAppBar/PrimarySearchAppBar.js'
import Card from './Components/Card/Card'
import Select from './Components/Select/Select.js'
import './App.scss';
const movieData = [
  {
    name: "ALITA: BATTLE ANGEL",
    img: 'Alita.jpg',
  },
  {
    name: "AQUAMAN",
    img: 'aquaman.jpg',
  },
  {
    name: "BOHEMIAN RHAPSODY",
    img: 'rhapsody.jpg',
  },
  {
    name: "CAN YOU EVER FORGIVE ME",
    img: 'canyou.jpg',
  },
]

/* const style = styles; */

class App extends Component {
  render() {
    return (
      <div className='container'>
        <PrimarySearchAppBar />
        <div className='content'>
          <Select />
          <div className='cardsContainer'>
            {movieData.map((movie) => <Card movie={movie} />)}
            {/*             <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
