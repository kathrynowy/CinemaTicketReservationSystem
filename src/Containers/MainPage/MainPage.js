import React, { Component } from 'react';
import { connect } from "react-redux";

import { getMoviesAsync } from '../../actions/index.js'
import Select from '../../Components/Select/Select.js'
import CardList from '../../Components/CardList/CardList.js';


class MainPage extends Component {
  componentDidMount() {
    this.props.getMoviesAsync()
  }

  render() {
    return (
      <div className="main-page">
        <Select />
        <CardList movies={this.props.movies} />
      </div>
    )
  }
}

const mapStateToProps = store => ({
  movies: store.movies.movies
})

const mapDispatchToProps = dispatch => ({
  getMoviesAsync(movieData) {
    dispatch(getMoviesAsync(movieData));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
