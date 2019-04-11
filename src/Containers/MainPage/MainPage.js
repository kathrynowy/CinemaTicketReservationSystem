import React, { Component } from 'react';
import { connect } from "react-redux";

import { getMoviesAsync } from '../../actions/movies'
import Select from '../../Components/Select/Select.js'
import CardList from '../../Components/CardList/CardList.js';
import Spinner from '../../Components/Spinner/Spinner';
import { showSpinner, hideSpinner } from '../../actions/spinner'


class MainPage extends Component {
  componentDidMount() {
    this.props.showSpinner();
    this.props.getMoviesAsync()
    this.props.hideSpinner();
  }

  render() {
    return (
      <div className="main-page">
        <Select />
        {this.props.show
          ? <Spinner />
          : <CardList movies={this.props.filteredMovies ? this.props.filteredMovies : this.props.movies} />
        }
      </div>
    )
  }
}

const mapStateToProps = store => ({
  movies: store.movies.movies,
  filteredMovies: store.movies.filteredMovies,
  show: store.spinner.showSpinner
})

const mapDispatchToProps = dispatch => ({
  getMoviesAsync(movieData) {
    dispatch(getMoviesAsync(movieData));
  },
  showSpinner() {
    dispatch(showSpinner());
  },
  hideSpinner() {
    dispatch(hideSpinner());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
