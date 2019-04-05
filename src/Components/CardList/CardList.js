import React, { Component } from 'react';
import Card from './Card/Card'
import './CardList.scss';


class CardList extends Component {
  render() {
    return (
      <div className='card-list'>
        {this.props.movies.map((movie) => <Card movie={movie} key={movie.id} />)}
      </div>
    );
  }
}

export default CardList;
