import React, { Component } from 'react';
import { connect } from "react-redux";

import CardList from '../../Components/CardList/CardList.js';
import Spinner from '../../Components/Spinner/Spinner';
import { showSpinner, hideSpinner } from '../../actions/spinner'
import { getMoviesAsync } from '../../actions/movies'


class MainPage extends Component {
  async componentDidMount() {
    this.props.showSpinner();
    await this.props.getMoviesAsync()
    this.props.hideSpinner();
  }

  render() {
    return (
      <div className="main-page">
        {this.props.isLoading
          ? <Spinner />
          : <CardList movies={this.props.filteredMovies.length ? this.props.filteredMovies : this.props.allMovies} />
        }
      </div>
    )
  }
}

const mapStateToProps = store => ({
  allMovies: store.movies.allMovies,
  filteredMovies: store.movies.filteredMovies,
  isLoading: store.spinner.isLoading
})

const mapDispatchToProps = dispatch => ({
  getMoviesAsync(movieData) {
    return dispatch(getMoviesAsync(movieData));
  },
  showSpinner() {
    dispatch(showSpinner());
  },
  hideSpinner() {
    dispatch(hideSpinner());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
