import React, { Component } from 'react';
import { connect } from "react-redux";

import CardList from '../../Components/CardList/CardList.js';
import Spinner from '../../Components/Spinner/Spinner';
import { showSpinner, hideSpinner } from '../../sagas/spinner';
import { GET_MOVIES, CHECK_AUTH } from '../../constans/actionTypes';

class MainPage extends Component {
  async componentDidMount() {
    this.props.showSpinner();
    await this.props.getMoviesAsync();
    await this.props.checkAuth();
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
  getMoviesAsync() {
    return dispatch({ type: GET_MOVIES });
  },
  checkAuth() {
    return dispatch({ type: CHECK_AUTH });
  },
  showSpinner() {
    dispatch(showSpinner());
  },
  hideSpinner() {
    dispatch(hideSpinner());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
