import React, { Component } from 'react';
import PrimarySearchAppBar from './Components/PrimarySearchAppBar/PrimarySearchAppBar.js'
import Card from './Components/Card/Card'
import Select from './Components/Select/Select.js'
import './App.scss';
import movieData from './movieData.js'
/* const movieData = [
  {
    id: "1",
    name: "ALITA: BATTLE ANGEL",
    img: 'src/Assets/Alita.jpg',
  },
  {
    id: "2",
    name: "AQUAMAN",
    img: 'src/Assets/aquaman.jpg',
  },
  {
    id: "3",
    name: "BOHEMIAN RHAPSODY",
    img: 'src/Assets/rhapsody.jpg',
  },
  {
    id: "4",
    name: "CAN YOU EVER FORGIVE ME",
    img: 'src/Assets/canyou.jpg',
  },
]
 */



class App extends Component {
  render() {
    return (
      <div className='container'>
        <PrimarySearchAppBar />
        <Select />
        <div className='cardsContainer'>
          {movieData.map((movie) => <Card movie={movie} key={movie.id} />)}
        </div>
      </div>
    );
  }
}

export default App;
