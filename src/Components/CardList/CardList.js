import React, { Component } from 'react';
import Card from './Card/Card'
import movieData from '../../movieData.js'
import './CardList.scss';


class CardList extends Component {
  render() {
    return (
      <div className='card-list'>
        {movieData.map((movie) => <Card movie={movie} key={movie.id} />)}
      </div>
    );
  }
}

export default CardList;